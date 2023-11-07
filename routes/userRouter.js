import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePerimissions, checkForTestUser } from "../middleware/authMiddleware.js";
const router = Router();
import upload from "../middleware/multerMiddleware.js";

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', [authorizePerimissions("admin"), getApplicationStats])
router.patch('/update-user', checkForTestUser, upload.single('avatar'), validateUpdateUserInput, updateUser)

export default router;
