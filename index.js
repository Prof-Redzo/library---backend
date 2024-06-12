import express from "express";
import mongoose from "mongoose";

const app = express();

//mongoDB base
mongoose.connect("mongodb://localhost:27017/library---backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// schema for books
const Book = mongoose.model("Book", {
  title: String,
  content: String
});

// schema for admin user
const User = mongoose.model("User", {
  email: String,
  password: String
});

app.get('/', (req, res) => {
  res.send("Working");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});