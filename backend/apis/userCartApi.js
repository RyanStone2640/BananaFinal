// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const Cart = require("../models/cart.js")
const CartItem = require("../models/cartItem.js")
const Products = require('../models/products'); 

const isLogin = require("../AuthGuard/isLogin.js")
const rootPath = path.resolve(__dirname,'..'); //取得上一層路徑位置  


const router = express.Router();

router.get('/userCartApi', (req, res) => {

	req.user.getCart()
	.then((cart)=>{
		CartItem.findAll({
			where: {
				cartId: cart.id
			},
		})
		.then((userCart)=>{
			return res.send(JSON.stringify(userCart));
		})
		.catch((err)=>{
			return res.send(err)
		}) 
	})
})




module.exports = router;