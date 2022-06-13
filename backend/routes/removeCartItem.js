// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const Cart = require("../models/cart")
const CartItem = require("../models/cartItem.js")


const isLogin = require("../AuthGuard/isLogin.js")

const router = express.Router();

router.post('/removeCartItem', (req, res) => {
	let {id } = req.body
	CartItem.findOne({where: {id}})
	.then((cartitem) => {
		cartitem.destroy()
		.then(() => {
	  		console.log('destroy done!');
	  		return res.send({status: 1})
		})
		.catch((err)=>{
			console.log(err);
			return res.send({status: 0})
		})
	})
	.catch((err)=>{
		console.log(err)
		return res.send({status: 0})
	}) 
})




module.exports = router;