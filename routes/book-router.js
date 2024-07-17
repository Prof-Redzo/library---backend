import express from "express";
import verify from "../middlewares/auth-middleware.js";
import { createBook } from "../controllers/book-controller.js";
import { deleteBook } from "../controllers/book-controller.js";
import { updateBook } from "../controllers/book-controller.js";

const router = express.Router(); 

router.post('/books', verify, createBook);
router.delete("/books/:id", verify, deleteBook);
router.put("/books/:id", verify, updateBook);

export default router;