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

export const deleteBook = async (req, res) => {
  const { id } = req.params;
   
   try{
    if(id){
 const result = await Book.findByIdAndDelete(id);
 
if (result) {
  res.status(204).send();
} else {
  res.status(404).send("Book not found");
}
} else {
  res.status(403).send("Cannot delete book");
}
} catch(e) {
  res.status(500).send("Something went wrong");
}
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  try {
    
    const book = await Book.findOne({ _id: id, createdBy: req.user._id });

    if (!book) {
      return res.status(404).send({ error: 'Book not found or you do not have permission to update this book' });
    }

    updates.forEach(update => book[update] = req.body[update]);
    await book.save();

    res.status(200).send({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const searchBooks = async (req, res) => {
  const { query } = req.query;

  try {
    let books;
    if (query) {
   
      books = await Book.find({
        $or: [
          { title: new RegExp(query, 'i') },
          { authorsName: new RegExp(query, 'i') }
        ]
      });
    } else {
     
      books = await Book.find({});
    }

    res.status(200).send(books);
  } catch (error) {
    console.error('Error searching for books:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}; 