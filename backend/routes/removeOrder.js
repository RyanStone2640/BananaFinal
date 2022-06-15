// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const Order = require("../models/order.js")
const OrderItem = require("../models/orderItem.js")

const router = express.Router();

router.post('/removeOrder', (req, res) => {
	let {orderId} = req.body
	// 刪除orderItem
	OrderItem.destroy({
		where: {
			orderId
		}
	})
	.then(() => {
		return "removeOrderItem"
	})
	.then((resultMeg) => {
		console.log(resultMeg);
		// 刪除order
		Order.destroy({
			where: {
				id: orderId
			}
		})
		.then(()=>{
			console.log("destroy order and orderItem")
			return res.send({status: 1})
		})
		.catch((err)=>{
			console.log(err)
			return res.send({status: 0})
		})
	})
	.catch((err)=>{
		console.log(err);
		return res.send({status: 0})
	})
})




module.exports = router;