import { Project } from "../models/Project.js";
import catchAsync from "../utils/catchAsync.js";

export const createProject = catchAsync(async (req, res) => {
  const newProject = await Project.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      project: newProject,
    },
  });
});

export const getAllProjects = catchAsync(async (req, res) => {
  const projects = await Project.find();

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: {
      projects,
    },
  });
});

export const getProject = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      status: "fail",
      message: "No project found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

export const updateProject = catchAsync(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    return res.status(404).json({
      status: "fail",
      message: "No project found with that ID or you are not authorized",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

export const deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!project) {
    return res.status(404).json({
      status: "fail",
      message: "No project found with that ID or you are not authorized",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
