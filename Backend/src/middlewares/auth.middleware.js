import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  try {
    let token;

    // Cookie se token
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Authorization header se token
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
        err: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "Invalid token",
    });
  }
}