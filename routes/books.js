//import express and router
const express = require('express');
const book = require('../models/book');
const router = express.Router()
const Book = require('../models/book')

//All books route - renders the data from books.ejs file
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
    const books = await Book.find(searchOptions)
    res.render('books/index', { 
        books:  books,
        searchOptions: req.query
    })
} catch {
    res.redirect('/')
}
})

//new book's route - renders the data from models/books.js file
router.get('/new', (req, res) => {
    res.render('books/new', { book: new book()})
});


//Create books route - renders the data from books.ejs file
router.post('/', async (req, res) => {
    const book = new Book({
        name: req.body.name
    })
    try {
    const newBook = await book.save()
    //res.redirect(`books/${newBook.id}`)
    res.redirect(`books`)
    } catch {
        res.render('books/new', { 
            book:  book,
            errorMessage: "Error creating Book"
        })
    }  
    })
    


//exports file to application
module.exports = router