const Author = require("../model/Author");

class AuthorController{
    // Add Author
    async addAuthor(req, res){
        try {
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            res.status(200).json(savedAuthor);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async getAllAuthor(req, res){
        try {
            const authors = await Author.find({});
            res.status(200).json(authors);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async getAnAuthor(req, res){
        try {
            const author = await Author.findById(req.params.id);
            //.populate("books");
            res.status(200).json(author);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async updateAnAuthor(req, res){
        try {  
            const author = await Author.findById(req.params.id);
            await author.update({ $set: req.body });
            res.status(200).json("Update Successful");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async searchAnAuthor(req, res){
        try {
            const authors = await Author.find({name: req.params.name});
            res.status(200).json(authors);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }  
    async deleteAnAuthor(req, res){
        try {
            // await Book.updateMany({ author: req.params.id }, {author: null});
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successful");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
}

module.exports = new AuthorController;