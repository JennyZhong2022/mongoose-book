const Book = require('../models/book')


const index = async(req,res)=> {
    try {
      const books = await Book.find({ userRecommending: req.user._id });
      res.render('books/index', { title: 'My Recommend', titleSearch: req.query.title || '' ,books });
    } catch (err) {
      console.log(err);
      res.render('error', { errMsg: err.message });
    }
  };
  
  const allBooks = async(req,res)=> {
    const books = await Book.find({})
    res.render('books/index', {title: 'All Books',titleSearch: req.query.title || '' ,books })
  }

const show = async (req,res) => {
  const book = await Book.findById(req.params.id)
  res.render('books/show',{title: 'Book Details',book})
}

const newBook = (req,res) => {
  res.render('books/new',{title: 'Add Book',errorMsg:''})
}

const create = async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, userRecommending : req.user._id})
    res.redirect(`books/${book._id}`)

  } catch (err) {
    console.log(err);
    res.render('books/new', { errMsg: err.message })
  }
  
}

const deleteBook =async (req,res) => {
  await Book.findOneAndDelete(

    {
      _id:req.params.id, userRecommending : req.user._id
    } )
    res.redirect('/books')
}


const edit = async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id, userRecommending: req.user._id })
  if (!book) return res.redirect('/books')
  res.render('books/edit',{title: 'Edit Book',book})
}

const update = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate({ _id: req.params.id, userRecommending: req.user._id },
      req.body,
      {new:true}
    
    ) 
    
   res.redirect(`/books/${updatedBook._id}`)
   
   } catch (err) {
    console.log(err.message);
 res.redirect('/books')
 }
 }


 const addReading = async(req,res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    // Handle the case where the book is not found
    return res.redirect('/books');
  }
  if (book.userReading.includes(req.user._id)) {
    // The user has already added this book to their reading list
    return res.redirect('/books/my-reading-list');
  }
  book.userReading.push(req.user._id);
  await book.save();
  res.redirect('/books/my-reading-list');
};

const showReadingList =async (req,res) => {
  const books = await Book.find({ userReading: req.user._id })
  res.render('books/reading-list',{title:'My Read',books})
}

const searchedBooks = async (req,res) => {
  let bookQuery = req.query.title ? { title: new RegExp(req.query.title, 'i') } : {}
  const books = await Book.find(bookQuery)
  res.render('books/index', {
    title:'Search Title',books,titleSearch:req.query.title
  })
}

module.exports = {
  index,show,new:newBook,create,allBooks,delete:deleteBook,edit,update,addReading,showReadingList,searchedBooks
}