import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// desc         Getting usersData
// method       GET /usersData
// access       Admin access PRIVATE
const usersData = async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
};

// desc         Register a new User
// method       POST /register
// access       PUBLIC
const newUser = async (req, res) => {
  const { _id, username, email, mobile, aadhar, city, district, password } =
    req.body;

  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "User Already Exists!" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    username,
    email,
    mobile,
    aadhar,
    city,
    district,
    password: hashedPwd,
  });
  await newUser.save();

  res.status(201).json({
    message: "User Register Successfully!",
    token: generateToken(_id),
  });
};

// desc         Login a registered User
// method       POST /login
// access       PUBLIC
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User Doesn't Exist!" });
  }

  const validPwd = await bcrypt.compare(password, user.password);

  if (user && validPwd) {
    return res.json({
      message: "Login Success!",
      token: generateToken(user._id),
    });
  } else {
    return res.json({ message: "Incorrect Password!" });
  }
};

// fn for generating JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "secret");
};
export { usersData, newUser, login };
