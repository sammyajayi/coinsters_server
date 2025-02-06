import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User";
import { Project } from "./models/Project";
import { icoData } from "./data";

dotenv.config();
connectDB();
const users = [
  {
    email: "coinsters.web3@gmail.com",
    password: "Explore@96",
    name: "Coinsters",
    role: "admin",
  },
  {
    email: "sammyajayi96@gmail.com",
    password: "Explore@96",
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
      return { ...product, user: creator };
    });

    // const sampleCategory = categories.map((category) => {
    //   return { ...category, user: adminUser };
    // });

    await Project.insertMany(prepProjects);
    // await Category.insertMany(sampleCategory);
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany();
    // await Product.deleteMany();
    // await User.deleteMany();
    await Category.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
