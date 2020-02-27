const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All authors Route
router.get('/', (req, res) => {
    res.render('authors/index');
});


// New author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

/**
 * We're going to use async fxn in this case to create new author Route.
 * This is to avoid using nested if statements
 */
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }
})


module.exports = router