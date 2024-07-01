import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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


export const login = async (req, res) => {
  try{
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  console.log(user);
  if(!user) {
    return res.status(401).send("Wrong credentials");
  }
  
  const currentDate = new Date();

  if (user.startDate && currentDate < user.startDate) {
    return res.status(403).send("Account not active yet");
  }

  if (user.expiryDate && currentDate > user.expiryDate) {
    return res.status(403).send("Account expired");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if(passwordMatch) {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
      email: user.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60 });
    res.status(200).send({ token });
  } else{
    return res.status(401).send("Wrong credentials");
  }
} catch(e){
  res.status(500).send("Something went wrong");
}
};