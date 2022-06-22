const Cart = require('../model/BookOrder')
const Book = require('../model/Book')
const Author = require('../model/Author')

class CartController{
    getCart(req, res, next){
        const userId = req.params.idUser
        Cart.find({user: userId, status: 0})
        .populate({
            path: 'book',
            populate: {
                path: 'author'
            }
        })
        .exec(function (err, results) {
            if(!err){
                res.status(200).json({
                    data: results
                })
            }else{
                res.status(500).json({
                    error: 'Internal server error'
                })
            }
        });
        // Cart.find({user: userId, status: 0}).populate('book')
        //     .then( cart => {
        //         res.status(200).json({
        //             data: cart
        //         })
        //     })
        //     .catch(err => {
        //         res.status(500).json({
        //             error: 'Internal server error'
        //         })
        //     })
    }
    async addToCart(req, res){
        const userId = req.params.idUser, body = req.body, bookId = body.bookId, quantity = body.quantity, status = 0
        Cart.create({
            user: userId,
            book: bookId,
            quantity,
            status
        }).then(() => res.status(200).json({
            data: true
        })).catch(err => {
            res.status(500).json({
                error: 'Internal server error'
            }
            )
        })
    }
    async deleteFromCart(req, res){
        const userId = req.params.userId, body = req.body, book_order_delete_list = body.book_order_delete_list
        Cart.deleteMany({_id: {$in: book_order_delete_list}})
            .then(() => {
                res.status(200).json({
                    data: true
                })
            })
            .catch(err => {
                res.status(200).json({
                    error: 'Internal server error'
                })
            })
    }
}
module.exports = new CartController