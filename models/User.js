import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: Number,
  startDate: {type: Date, default: Date.now},
  expiryDate: {type: Date}
});

const User = mongoose.model("User", userSchema);

export default User;
