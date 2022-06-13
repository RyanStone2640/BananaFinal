// 第三方套件
const express = require('express');
const ProductEntry = require('../models/productEntry'); 
const Products = require('../models/products'); 

const ImgUrl = require('../models/imgUrl.js') 


const router = express.Router();

router.post('/productApi', (req, res) => {
	let {productsId} = req.body
	Products.findOne({
		where: {
			id: productsId
		},
		include: [ImgUrl],
	})
	.then((product)=>{
		return res.send(JSON.stringify(product));
	})
	.catch((err)=>{
		return res.send(err)
	})
});
module.exports = router;