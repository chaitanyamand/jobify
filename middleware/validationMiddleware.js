import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError, InternalServerError } from '../errors/customError.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'
const withValidationErrors = (validateValues) => {
    return [
        validateValues, (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg)
                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages)
                }
                if (errorMessages[0].startsWith('not authorised')) {
                    throw new UnauthorizedError(errorMessages)
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ]
}

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value'),
])

export const validateIdParams = withValidationErrors([
    param("id").custom(async (value, { req }) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) {
            throw new BadRequestError('invalid mongo id')
        }
        const job = await Job.findById(value);
        if (!job) {
            throw new NotFoundError('no job with id ' + value);
        }
        const isAdmin = req.user.role === 'admin'
        const isOwner = req.user.userId === job.createdBy.toString()
        if (!isAdmin && !isOwner) {
            throw new UnauthorizedError('not authorised to access this route')
        }
    }),
])

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email) => {
        const user = await User.findOne({ email })
        if (user) throw new BadRequestError('email already exists')


        //email validation
        const response = await fetch("https://emailvalidation.abstractapi.com/v1/?api_key=" + process.env.EMAIL_VALIDATION_API_KEY + "&email=" + email)
        const jsonResp = await response.json();
        if (jsonResp.quality_score < 0.70) throw new BadRequestError('invalid email')
        if (jsonResp.is_valid_format.value === false) throw new BadRequestError('email format is invalid. enter valid email')
        if (jsonResp.is_disposable_email.value === true) throw new BadRequestError('email is disposable. enter valid email')
        if (jsonResp.is_mx_found.value === false) throw new BadRequestError('mx validation failed. enter valid email')
        if (jsonResp.is_smtp_valid.value === false) throw new BadRequestError('smtp validation failed. enter valid email')

    }),
    body('password1').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be atleast 8 characters long'),
    body('password2').notEmpty().withMessage('password not re-entered').custom((value, { req }) => {
        if (value !== req.body.password1) {
            throw new BadRequestError('re-entered password is not the same');
        }
        return true;
    }),

    body('location').notEmpty().withMessage('location is required'),
    body("lastName").notEmpty().withMessage("last name is required")
])

export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
])

export const validateUpdateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email });
            if (user && user._id.toString() !== req.user.userId) {
                throw new Error("email already exists");
            }
        }),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
]);