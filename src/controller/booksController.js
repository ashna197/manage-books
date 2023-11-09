const uuid = require('uuid');
const validationCheck = require('../validationCheck');
const booksModel = require('../model/bookModel');
const CONSTANTS = require('../constants');
const { isEmpty } = require("lodash");

async function addBookDetails(req, res) {
    try {
        //For checking the validations on req.body
        const errors = validationCheck.validateRequestBody(req.body);
        if (!isEmpty(errors)) {
            return res.status(400).json(errors)
        }
        req.body['id'] = uuid.v4();
        const bookDetails = await booksModel.create(req.body);
        delete bookDetails._doc._id;
        delete bookDetails._doc.__v;
        return res.status(201).json(bookDetails);
    } catch (error) {
        if (error.code === CONSTANTS.MONGO.ERROR_CODES.DUPLICATE) {
            return res.status(409).json({ error: `Book title already exist` });
        }
        return res.status(500).json({ error: `Error creating the book : ${error}` });
    }
};

/**
 * Retrieve all Books details
 * @param {*} req 
 * @param {*} res 
 */
async function getAllBooks(req, res) {
    try {
        const booksDetails = await booksModel.find({}, { _id: 0, __v: 0 });
        return res.status(200).json(booksDetails);
    } catch (error) {
        return res.status(500).json({ error: `Error retrieving all books : ${error}` });
    }
};

/**
 * Retrieve a specific book by ID
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getBookById(req, res) {
    try {
        //To validate the bookId passed in params is valid uuid or not
        if (!validateUUID(req.params.bookId)) {
            return res.status(400).json({ detail: `id : ${req.params.bookId} is not a valid uuid` })
        }
        const bookDetails = await booksModel.findOne({ id: req.params.bookId }, { _id: 0, __v: 0 });
        if (!bookDetails) {
            return res.status(404).json({ error: `Book Details not found for id : ${req.params.bookId}` });
        }
        return res.status(200).json(bookDetails);
    } catch (error) {
        return res.status(500).json({ error: `Error retrieving bookDetails : ${error}` });
    }
};

/**
 * update book details by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function updateBookDetails(req, res) {
    try {

        //To check the bookId is a valid uuid or not
        if (!validateUUID(req.params.bookId)) {
            return res.status(400).json({ detail: `id : ${req.params.bookId} is not a valid uuid` })
        }
        //To check the validations on body passed in the request
        const errors = validationCheck.validateRequestBody(req, res);
        if (!isEmpty(errors)) {
            return res.status(400).json(errors)
        }
        let options = Object.assign({}, {
            returnOriginal: false,
            projection: { __v: 0, _id: 0 }
        });
        req.body["id"] = req.params.bookId;
        const updatedBookDetails = await booksModel.findOneAndReplace({ id: req.params.bookId }, req.body, options);
        if (!updatedBookDetails) {
            return res.status(404).json({ error: `Book details not found for id: ${req.params.bookId}` });
        }
        return res.status(200).json(updatedBookDetails);
    } catch (error) {
        if (error.code === CONSTANTS.MONGO.ERROR_CODES.DUPLICATE) {
            return res.status(409).json({ error: `Book with this title already exist` });
        }
        return res.status(500).json({ error: `Error updating book details : ${error}` });
    }
};

/**
 * Delete a book by ID
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function deleteBookDetails(req, res) {
    try {
        //To check the bookId is a valid uuid or not
        if (!validateUUID(req.params.bookId)) {
            return res.status(400).json({ detail: `id : ${req.params.bookId} is not a valid uuid` })
        }
        const deletedBook = await booksModel.findOneAndDelete({ id: req.params.bookId });
        if (!deletedBook) {
            return res.status(404).json({ error: `Book Details not found for id : ${req.params.bookId}` });
        }
        return res.status(204).send(); // No content
    } catch (error) {
        return res.status(500).json({ error: `Error deleting book details : ${error}` });
    }
};

function validateUUID(id) {
    return uuid.validate(id);
}

module.exports = { addBookDetails, getAllBooks, getBookById, updateBookDetails, deleteBookDetails } 
