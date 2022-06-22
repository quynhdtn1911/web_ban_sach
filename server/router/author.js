const authorController = require('../controller/AuthorController');

const router = require('express').Router();

// ADD AUTHOR
router.post('/', authorController.addAuthor);

// Get an Author
router.get('/:id', authorController.getAnAuthor);

// Update an Author
router.put('/:id', authorController.updateAnAuthor);

// Delete an Author
router.delete('/:id', authorController.deleteAnAuthor);

//Search an Author
router.get('/searchRecord/:name', authorController.searchAnAuthor);

// Get all authors
router.get('/', authorController.getAllAuthor);

module.exports = router;