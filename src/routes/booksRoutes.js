const express = require('express');
const router = express.Router();
const booksHandler = require('../controller/booksController')

// add a new book deatils
router.post('/',  (req, res) => {
    booksHandler.addBookDetails(req, res)
});

// Retrieve all books
router.get('/',  (req, res) => {
    booksHandler.getAllBooks(req, res)
});

// Retrieve a specific book details by ID
router.get('/:bookId',  (req, res) => {
    booksHandler.getBookById(req, res)
});

// Update a book details by ID
router.put('/:bookId',  (req, res) => {
    booksHandler.updateBookDetails(req, res)
});

// Delete a book deatils by ID
router.delete('/:bookId',  (req, res) => {
    booksHandler.deleteBookDetails(req, res)
});

module.exports = router; 
