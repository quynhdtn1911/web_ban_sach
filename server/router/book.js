const bookController = require('../controller/BookController');

const router = require('express').Router();

// ADD a book
router.post('/', bookController.addABook);


//Get book by generes
router.post('/generes', bookController.getBookByGeneres);

//Search a book
router.get('/searchRecord/:name',bookController.searchABook);

// Get a book
router.get('/:id', bookController.getABook);

//Update a book
router.put('/:id', bookController.updateABook);

// Delete a book
router.delete('/:id', bookController.deleteABook);

//Search book
router.post('/search', bookController.searchBook);

// Get all authors
router.get('/', bookController.getAllBooks);

module.exports = router;