import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/mail.service.js";
// @description: Register a new user
// @route: POST /api/auth/register
// @access: Public
// @body: { username: String, email: String, password: String }

export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isUserExist = await UserModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const emailVerificationToken = jwt.sign(
    { email: newUser.email },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "welcome to our app! Please verify your email",

    html: `
 
    <p>Hi ${username},</p>
     
    <p>Please verify your email by clicking the following link: 
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
    Verify Email</a>
    </p>
     <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
    `,
  });

  return res.status(201).json({
    message: "User registered successfully",
    newUser: {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    },
  });
}
