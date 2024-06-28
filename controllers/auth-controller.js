import bcrypt from "bcrypt";

import User from "../models/User.js";

export const registerUser = async (req,res) => {
  const data = req.body;
  try {
    
    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      return res.status(403).send("User with that email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS));
    data.password = hashedPassword;

    const newUser = new User(data);
    const result = await newUser.save();

    return res.status(201).send("User created successfully!");

  } catch (error) {
    console.error(error);
    return res.status(500).send("Could not create user");
  }
};