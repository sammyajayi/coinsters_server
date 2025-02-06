import express from "express";
import { protect } from "../middleware/auth.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.use(protect);
router.patch("/updateProfile", updateProfile);

export default router;
