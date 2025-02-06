import { User } from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";

export const updateProfile = catchAsync(async (req, res) => {
  if (req.body.password) {
    return res.status(400).json({
      status: "fail",
      message:
        "This route is not for password updates. Please use /updatePassword.",
    });
  }

  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    profilePicture: req.body.profilePicture,
    bio: req.body.bio,
  };

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
