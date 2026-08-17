import express from "express"; 
import { registerUser,verifyEmail,loginUser,getMe,logoutUser } from "../controllers/Auth.controller.js";
import { registerValidation, loginValidation } from "../validators/auth.validator.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
const authRouter = express.Router();


// @route: POST /api/auth/register
// @access: Public
// @body: { username: String, email: String, password: String }
// @description: Register a new user

authRouter.post("/register",registerValidation,registerUser); 

// @route: GET /api/auth/verify-email
// @access: Public
// @description: Verify user's email address
// @query: { token: String }

authRouter.get("/verify-email",verifyEmail)

// @route: POST /api/auth/login
// @access: Public
// @body: { email: String, password: String }
// @description: Login a user and return a JWT token
// @query: { email: String, password: String }

authRouter.post("/login",loginValidation,loginUser)

// @route: GET /api/auth/getMe
// @access: Private
// @description: Get the currently logged-in user's information
// @query: { token: String }
// @middleware: authMiddleware
authRouter.get("/getme",authMiddleware,getMe)

//logout api


authRouter.post('/logout',logoutUser)


export default authRouter;