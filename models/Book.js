import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    inventoryNumber: Number,
    authorsName: String,
    publicationYear: Date,
    publicationPlace: String,
    publisher: String
});

const Book = mongoose.model("Book", bookSchema);

export default Book;