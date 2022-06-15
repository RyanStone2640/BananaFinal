// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const Order = require("../models/order.js")
const OrderItem = require("../models/orderItem.js")
const ProductEntry = require('../models/productEntry'); 
const Products = require('../models/products');  
const Cart = require("../models/cart.js")
const CartItem = require("../models/cartItem.js")

const isLogin = require("../AuthGuard/isLogin.js")

const rootPath = path.resolve(__dirname,'..'); //取得上一層路徑位置  


const router = express.Router();

router.get('/createOrder',isLogin, (req, res) => {
	req.user.getCart()
	.then((cart)=>{
		CartItem.findAll({
			where: {
				cartId: cart.id
			}
		})
		.then((cartItem)=>{
			return req.user.createOrder()
			.then((order)=>{
				let orderItemArr = []
				for(let i = 0; i <= cartItem.length - 1; i++){
					orderItemArr.push({
						quantity: cartItem[i].quantity,
						orderId: order.id,
						productentryId: cartItem[i].productentryId,
						bananaproductId: cartItem[i].bananaproductId		
					})
				}			
				// 建立訂單資料
				OrderItem.bulkCreate(orderItemArr)

			})
			.then(()=>{
				// 刪除使用者以建立訂單的購物車資料
				CartItem.destroy({
					where: {
						cartId: cart.id
					}
				})
				.then(()=>{
					console.log("已刪除購物車")
					return res.send({status: 1})
				})
				.catch((err)=>{
					console.log(err)
					return res.send({status: 0})
				})
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	})
})

module.exports = router;