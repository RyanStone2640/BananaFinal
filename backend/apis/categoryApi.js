// 第三方套件
const express = require('express');
const Category = require('../models/category'); 

const ProductEntry = require('../models/productEntry'); 
const Products = require('../models/products'); 

const router = express.Router();

router.get('/categoryApi', (req, res) => {
	Category.findAll()
	.then((category)=>{
		res.send(category)
	})
	.catch((err)=>{
		console.log(err)
	})
});



module.exports = router;