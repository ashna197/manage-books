const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    id: { type: String, required: true, index: true },
    title: { type: String, required: true, unique: true }, 
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
    }
});

const BooksInfo = mongoose.model('BooksInfo', bookSchema, 'BooksInfo');

module.exports = BooksInfo; 
