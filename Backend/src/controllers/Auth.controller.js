import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/mail.service.js";

// @description: Register a new user
// @route: POST /api/auth/register
// @access: Public
// @body: { username: String, email: String, password: String }

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Email verification token
    const emailVerificationToken = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // User authentication token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Welcome to our app! Please verify your email",

      html: `
        <p>Hi ${username},</p>

        <p>Please verify your email by clicking the following link:</p>

        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
          Verify Email
        </a>

        <p>If you did not create an account, please ignore this email.</p>

        <p>Best regards,<br>The Perplexity Team</p>
      `,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,

      token,

      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });

  } catch (error) {
    console.log("REGISTER CONTROLLER ERROR:", error);

    return res.status(500).json({
      message: "Registration failed",
      success: false,
    });
  }
}
// @description: Login a user and return a JWT token
// @route: POST /api/auth/login
// @access: Public
//query: { email: String, password: String }
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    if (user && user.isverified === false) {
      return res
        .status(400)
        .json({ message: "Please verify your email before logging in" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      },
    );
    res.cookie("token", token)

    return res.status(200).json({
      message: "Login successful",
      token:token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

// @description: Get the currently logged-in user's information
// @route: GET /api/auth/getMe
// @access: Private
//query: { token: String }
export async function getMe(req, res) {

  const userId = req.user.id;

  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found",success: false });
  }

  return res.status(200).json({
    message: "User retrieved successfully",
    success: true,
    user
  })


}

// @description: Verify user's email address
// @route: GET /api/auth/verify-email
// @access: Public
//@query: { token: String }

export async function verifyEmail(req, res) {
  const { token } = req.query;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UserModel.findOne({
    email: decoded.email,
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  user.isverified = true;
  await user.save();

  const htmlContent = `
  <h1>Email Verified</h1>
  <p>Hi ${user.username},</p>
  <p>Your email has been successfully verified. You can now log in to your account.</p>
  <p>Best regards,<br>The Perplexity Team</p>
  `;

  res.status(200).send(htmlContent);
}