import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/auth-routes.js";
import bookRouter from "./routes/book-router.js";

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
app.use(bookRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port` + PORT);
});
