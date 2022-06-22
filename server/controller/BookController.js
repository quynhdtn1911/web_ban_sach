const  Book = require("../model/Book");
const  Author  = require("../model/Author");

class BookController{
    // Add A Book
    async addABook(req, res){
        try {
            console.log(req.body);
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            res.status(200).json(savedBook);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    // Get all books
    async getAllBooks(req, res){
        try {
            const books = await Book.find().populate("author");
            res.status(200).json({
                data: books
            });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    // Get a book
    async getABook(req, res){
        try {
            const book = await Book.findById(req.params.id).populate("author");
            res.status(200).json(book);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    // Update a book
    async updateABook(req, res){
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({ $set: req.body });
            res.status(200).json("Update Successful");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    // Delete a book
    async deleteABook(req, res){
        try {
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successful");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    // Filter book
    async searchBook(req, res){
        try {
            let search = req.body.name;
            const books = await Book.find({name: {$regex: new RegExp('^' + search + '.*', 'i')}}).exec();
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    // Get book by generes
    async getBookByGeneres(req, res){
        try {
            let search = req.body.generes;
            const books = await Book.find({generes: {$regex: new RegExp('^' + search + '.*', 'i')}}).exec();
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async searchABook(req, res){
        try {
            const book= await Book.find({name: req.params.name}).populate("author");
            res.status(200).json(book);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new BookController;