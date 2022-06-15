// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const Cart = require("../models/cart.js")
const CartItem = require("../models/cartItem.js")
const ProductEntry = require('../models/productEntry'); 
const Products = require('../models/products'); 
const ImgUrl = require('../models/imgUrl'); 

const isLogin = require("../AuthGuard/isLogin.js")
const rootPath = path.resolve(__dirname,'..'); //取得上一層路徑位置  


const router = express.Router();

router.post('/addCart', (req, res) => {
	// let {productsId, productId, number } = req.body
	let dataArr = JSON.parse(req.body.data)
	req.user.getCart()
	.then((cart)=>{


		// 將購物車金額加總 ，如果一次傳入多筆資料，只會加總最後一筆資料的金額
		// Products.findOne({
		// 	where: {
		// 		id: productsId
		// 	}
		// })
		// .then((product)=>{
		// 	let newAmount = cart.amount+ (Number(product.price)* number)

		// 	cart.update({
		// 		amount: newAmount
		// 	}) 

		// })
		
		let cartItemArr = []
		for(let value of dataArr){
			cartItemArr.push({
				quantity: value.number,
				cartId: cart.id,
				productentryId: value.productId,
				bananaproductId: value.productsId				
			})
		}

		CartItem.bulkCreate(cartItemArr)
		.then(()=>{
			console.log("建立成功")
			return res.send({status: 1})
		})
		.catch((err)=>{
			console.log(err)
			return res.send({status: 0})
		})		   
	})
	.catch((err)=>{
		console.log(err)
		return res.send({status: 0})
	})
})




module.exports = router;