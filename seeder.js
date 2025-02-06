import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Project } from "./models/Project.js";
import { icoData } from "./data.js";
import connectDB from "./config/db.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();
const users = [
  {
    email: "coinsters.web3@gmail.com",
    password: bcrypt.hashSync("Explore@96", 12),
    name: "Coinsters",
    role: "admin",
  },
  {
    email: "sammyajayi96@gmail.com",
    password: bcrypt.hashSync("Explore@96", 12),
    name: "sammy_ajayi",
    role: "admin",
  },
];

const importData = async () => {
  try {
    await Project.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const creator = createdUsers[0]._id;
    const prepProjects = icoData.projects.map((project) => {
      return { ...project, user: creator };
    });

    console.log(prepProjects);

    const newPro = await Project.insertMany(prepProjects);
    if (newPro) {
      console.log("succes");
    } else {
      console.log("error inserting projects");
    }
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany();
    await Project.deleteMany();
    await User.deleteMany();
    // await Category.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
