import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('authentication invalid');
    }
    try {
        const { userId, role } = verifyJWT(token)
        const testUser = userId === "654ce814a5fb97be92b5e42a";
        req.user = { userId, role, testUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid');
    }
}

export const authorizePerimissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('unauthorised to access this route')
        }
        next();
    }
}

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) throw new BadRequestError('Demo User,Read Only');
    next();
}
