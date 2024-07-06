import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/auth-routes.js";
import { verify } from "./middlewares/auth-middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

//mongoDB base
const connectToDb = async () =>{
await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`) }
connectToDb().then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRouter);


app.post('/books', verify, async (req, res) => {
  const { title, authorsName } = req.body;

  if (!title || !authorsName) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  try {
    const book = new book({
      title,
      authorsName,
      createdBy: req.user.id 
    });
    await book.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port` + PORT);
});