import express from "express";
import {
  login,
  logout,
  signup,
  verifyToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", verifyToken);
router.get("/logout", logout);

export default router;
