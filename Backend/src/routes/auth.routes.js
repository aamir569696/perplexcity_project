import express from "express"; 
import { registerUser } from "../controllers/Auth.controller.js";
import { registerValidation, loginValidation } from "../validators/auth.validator.js";
const authRouter = express.Router();


// @route: POST /api/auth/register
// @access: Public
// @body: { username: String, email: String, password: String }
// @description: Register a new user


authRouter.post("/register",registerValidation,registerUser); 

export default authRouter;