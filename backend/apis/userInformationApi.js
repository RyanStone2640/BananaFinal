// 第三方套件
const express = require('express');
const User = require('../models/user'); 


const router = express.Router();

router.post('/userInfomationApi', (req, res) => {
	let userId = req.body.userId
	User.findOne({where: {id: userId}})
	.then((User)=>{
		res.send(User)
	})
	.catch((err)=>{
		console.log(err)
		res.send(err)
	})
});

module.exports = router;