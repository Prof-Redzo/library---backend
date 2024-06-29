import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/auth-routes.js";
import User from "./models/User.js";
import { createRequire } from 'module';
import { logger } from "./middlewares/log-middleware.js";

const require = createRequire(import.meta.url);

const app = express();
const PORT = process.env.PORT || 3000;

//mongoDB base
const connectToDb = async () =>{
await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`) }
connectToDb().then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.get('/admin', (req, res) => {
  res.render("admin");
});

app.post("/admin/login", async (req,res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username, password });
   if (user) {
    res.redirect('/admin/dashboard');
  } else {
    res.send('Invalid username or password');
  }
  });

  app.get('/admin/dashboard', (req, res) => {
    res.send('Admin Dashboard');
  });

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port` + PORT);
});