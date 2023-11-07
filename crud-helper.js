// to read in those env variables just like in server.js
require('dotenv').config();
// Connect to the database
require('./config/database');

// Require the app's Mongoose models
const Book = require('./models/book')


// Example CRUD

// Top-level await (using await outside of an async function)
// has been available since Node v14.8

// let books = await Book.find({});

// console.log(books);