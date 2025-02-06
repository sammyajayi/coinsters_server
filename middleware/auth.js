import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";

export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in. Please log in to access.",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token no longer exists.",
    });
  }

  req.user = user;
  next();
});
