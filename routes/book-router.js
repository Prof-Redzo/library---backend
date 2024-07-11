import express from "express";
import verify from "../middlewares/auth-middleware.js";
import { createBook } from "../controllers/book-controller.js";

const router = express.Router(); 

router.post('/books', verify, createBook);

export default router;