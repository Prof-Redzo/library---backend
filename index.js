import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

//mongoDB base
const connectToDb = async () =>{
await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`) }
connectToDb().then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// schema for books
const Book = mongoose.model("Book", {
  title: String,
  inventoryNumber: Number,
  authorsName: String,
  publicationYear: {type: Date, default: Date.now},
  publicationPlace: String,
  publisher: String
});

// schema for admin user
const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: Number,
  startDate: {type: Date, default: Date.now},
  expiryDate: {type: Date}
});

app.get('/', (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port` + PORT);
});