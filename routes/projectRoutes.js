import express from "express";
import {
  updateProject,
  createProject,
  getAllProjects,
  getProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllProjects).post(createProject);

router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject);

export default router;
