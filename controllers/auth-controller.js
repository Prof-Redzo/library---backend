import bcrypt from "bcrypt";

import User from "../models/User.js";

export const registerUser = async (req,res) => {
  const data = req.body;
  const userExists = await User.findOne({ email: data.email });

  if(userExists) {
    return res.status(403).send("User with that email already exists");
  } else {
    const newUser = new User(data);
     await newUser.save();
     return res.status(201).send("User created successfully!");
  }
}
 