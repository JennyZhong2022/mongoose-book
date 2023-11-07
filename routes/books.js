const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
const isAuthenticated=require('../config/ensureLoggedIn')


/* GET users listing. */
router.get('/', isAuthenticated,bookController.index);

// get all listing not mather who
router.get('/all',bookController.allBooks)

router.get('/new',isAuthenticated, bookController.new);

router.get('/my-reading-list', bookController.showReadingList)

router.get('/searched-books',bookController.searchedBooks)

router.get('/:id',bookController.show)

router.post('/', isAuthenticated,bookController.create)

router.delete('/:id',bookController.delete)

router.get('/:id/edit', bookController.edit)

router.put('/:id', bookController.update)

router.get('/my-reading-list/:id', bookController.addReading);







module.exports = router;
