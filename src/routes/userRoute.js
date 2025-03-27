import express from 'express';
import { registerUser,loginUser,refreshToken } from '../controller/userController.js';
import { validateBody, userValidationSchema, loginValidationSchema } from '../validation/validation.js'

const router = express.Router();

router.post('/register', validateBody(userValidationSchema),registerUser);
router.post('/login',validateBody(loginValidationSchema), loginUser);
router.get('/refresh-token', refreshToken);

export default router;