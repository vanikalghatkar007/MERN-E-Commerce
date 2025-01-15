import express from 'express';
import { loginAdmin, loginUser, registerUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login-user', loginUser)
userRouter.post('/admin-login', loginAdmin)

export default userRouter;