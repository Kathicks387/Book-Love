//import express and router
const express = require('express');
const router = express.Router()

//get index route - renders the data from index.ejs file
router.get('/', (req, res) => {
    res.render('index')
});

//exports file to application
module.exports = router