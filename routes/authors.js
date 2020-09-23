//import express and router
const express = require('express');
const author = require('../models/author');
const router = express.Router()
const Author = require('../models/author')

//All authors route - renders the data from authors.ejs file
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', { 
        authors: authors,
        searchOptions: req.query
    })
} catch {
    res.redirect('/')
}
})

//new author's route - renders the data from models/authors.js file
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new author()})
});


//Create authors route - renders the data from authors.ejs file
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
    const newAuthor = await author.save()
    //res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`)
    } catch {
        res.render('authors/new', { 
            author: author,
            errorMessage: "Error creating Author"
        })
    }  
    })
    


//exports file to application
module.exports = router