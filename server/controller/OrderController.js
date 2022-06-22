const Order = require('../model/Order')
const Cart = require('../model/BookOrder')

class OrderController{
    async add(req, res){
        const userId = req.params.idUser, body = req.body, book_order_list = body.book_order_list, address = body.address, shipment = body.shipment
        await Order.create({
            user: userId,
            bookOrders: book_order_list,
            address: address,
            shipment: shipment,
            status: 0 
        })
        await Cart.updateMany({_id: {$in: book_order_list}}, {status: 1})
        res.json({data: true})
    }
    async getListOrder(req, res){
        const userId = req.params.idUser
        Order.find({user: userId})
        .populate({
            path: 'bookOrders',
            populate: {
                path: 'book',
                populate: {
                    path: 'author'
                }
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
    }
    // getOrder(req, res, next){
    //     const userId = req.params.userId
    //     Order.find({user: userId, status: 0})
    //     .populate({
    //         path: 'bookOrders',
    //         populate: {
    //             path: 'book'
    //         }
    //     })
    //     .exec(function (err, results) {
    //         if(!err){
    //             res.status(200).json({
    //                 data: results
    //             })
    //         }else{
    //             res.status(500).json({
    //                 error: 'Internal server error'
    //             })
    //         }
    //     });
    // }

    // async getHistoryOrder(req, res, next){
    //     const idUser = req.params.userId
    //     Order.find({user: idUser, status: 1})
    //     .populate({
    //         path: 'bookOrders',
    //         populate: {
    //             path: 'book'
    //         }
    //     })
    //     .exec(function (err, results) {
    //         if(!err){
    //             res.status(200).json({
    //                 data: results
    //             })
    //         }else{
    //             res.status(500).json({
    //                 error: 'Internal server error'
    //             })
    //         }
    //     });
    // }

    // async addToOrder(req, res){
    //     const userId = req.params.userId, body = req.body, bookOrderIds = body.bookOrderIds, 
    //     dateCreate = body.dateCreate, totalPrice = body.totalPrice, status = 0, address = body.address
    //     Order.create({
    //         user: userId,
    //         bookOrders: bookOrderIds,
    //         dateCreate,
    //         totalPrice,
    //         address,
    //         status,
    //     }).then(() => res.status(200).json({
    //         data: true
    //     })).catch(err => {
    //         res.status(500).json({
    //             error: 'Internal server error'
    //         }
    //         )
    //     })
    // }

    // async updateOrder(req, res){
    //     const orderId = req.params.orderId
    //     try {
    //         const order = Order.findById(orderId)
    //         console.log(orderId)
    //         await order.updateOne({ $set: req.body });
    //         res.status(200).json("Update Successful");
    //     } catch (error) {
    //         res.status(500).json(err);
    //     } 
    // }

    // async updateCart(req, res){
    //     const idCart = req.params.idCart
    //     console.log("id Cart: " + idCart)
    //     try {
    //         const cart = await Cart.findById(idCart)
    //         await cart.update({ $set: req.body });
    //         console.log("order: " + req.body)
    //         res.status(200).json("Update Successful");
    //     } catch (error) {
    //         res.status(500).json(err);
    //     } 
    // }

    // async deleteFromCart(req, res){
    //     const userId = req.params.userId, body = req.body, book_order_delete_list = body.book_order_delete_list
    //     Order.deleteMany({_id: {$in: book_order_delete_list}})
    //         .then(() => {
    //             res.status(200).json({
    //                 data: true
    //             })
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 error: 'Internal server error'
    //             })
    //         })
    // }

    
}
module.exports = new OrderController