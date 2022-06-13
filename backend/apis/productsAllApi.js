// 第三方套件
const express = require('express');
const ProductEntry = require('../models/productEntry'); 
const Products = require('../models/products'); 


const Color = require('../models/color.js');
const ImgUrl = require('../models/imgUrl.js') 


const router = express.Router();

router.post('/productsAllApi', (req, res) => {
	let {categoryId} = req.body
	Products.findAll({
		where: {
			categoryId: categoryId 
		},
		include: [ Color, ImgUrl],
	})
	.then((products)=>{
		return res.send(JSON.stringify(products));
	})
	.catch((err)=>{
		return res.send(err)
	})
});
module.exports = router;