import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export async function authMiddleware(req, res, next) {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Database se actual user check karo
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    // Email verification required
    if (!user.isverified) {
      return res.status(403).json({
        message: "Please verify your email first",
        success: false,
      });
    }

    req.user = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "Invalid or expired token",
    });
  }
}