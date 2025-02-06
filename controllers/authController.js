import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  try {
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Add this
    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true, // Required with sameSite: 'none'
      sameSite: "none",
    });
  } catch (error) {
    console.log(error);
    return;
  }

  user.password = undefined;

  res.status(statusCode).json({
    isAuthenticated: true,
    success: true,
    user: user,
  });
};

export const signup = catchAsync(async (req, res) => {
  const { email, password, name } = await req.body;
  const role = "admin";
  if (!email || !password || !name) {
    return res.status(400).json({
      sucess: false,
      isAuthenticated: false,
      message: "Please provide all details",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.json({
      isAuthenticated: false,
      success: false,
      message: "Email Already Exist",
    });
  }

  const newUser = await User.create({
    email,
    password,
    name,
    role,
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  createSendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const verifyToken = async (req, res) => {
  const token = req.cookies.token;
  // console.log(token);

  if (!token) {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    return res.status(401).json({ error: "No token found", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    return res.json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        source: "test",
      },
    });
  } catch (error) {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    return res
      .status(400)
      .json({ error: "Error validating token", success: false });
  }
};
