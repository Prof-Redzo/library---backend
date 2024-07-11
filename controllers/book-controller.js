import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  const { title, authorsName } = req.body;

  if (!title || !authorsName) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  try {
    const book = new Book({
      title,
      authorsName,
      createdBy: req.user.id 
    });
    await book.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};