import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
  const newUser = await UserModel.create({
    username,
    email,
    password,
  });

  const emailVerificationToken = jwt.sign(
    { email: newUser.email },
    process.env.JWT_SECRET,
  );

  return res.status(201).json({
    message: "User registered successfully",
    newUser: {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    },
  });
}
