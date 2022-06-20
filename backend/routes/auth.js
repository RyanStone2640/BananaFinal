// 第三方套件
const express = require('express');
const bcryptjs = require('bcryptjs');// 加密使用者密碼
const path = require('path');
const cookie = require('js-cookie');
const axios = require('axios');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const isLogin = require("../AuthGuard/isLogin.js")// 使用資料庫
const rootPath = path.resolve(__dirname,'..'); //取得上一層路徑位置  


const router = express.Router();

// post login, signup
router.post('/signup', (req, res) => {
	let {name, phone, email, password, recaptchaToken} = req.body

	//google 驗證 
	let SECRET_KEY = "6LdhUXYgAAAAALphUmr8aD5p7-8kPOJssDMCYYv-"


	axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body['recaptchaToken']}`)
	.then((apiRes)=>{
		if(apiRes.data.success == 1){	
			// 判斷是否符合建立規則
			const rename =/^[a-zA-Z0-9]+$/;
			const rephone = /^09\d{8}$/;
			const reemail = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
			const repassword = /^[a-zA-Z0-9]+$/;

			if (
				name == '' || !rename.test(name) || 
				phone == '' || !rephone.test(phone) || 
				email == '' || !reemail.test(email) || 
				password == '' || !repassword.test(password)) {
				return res.send({status: 0})  	
			} 
			else {
			User.findOne({where: {email}})	// 判斷使用者是否已經存在
				.then((user)=>{
					if(user){
						return res.send({status: 0})
					}
					else{
						bcryptjs.hash(password, 12)// 密碼加密
						.then((hashedPassword) => {
							User.create({ name, phone, email, password: hashedPassword })
							.then((newUser)=>{
								newUser.createCart();
							})
							return res.send({status: 1})
						})
						.catch((err) => {
						  console.log('create new user error: ', err);
						  return res.send({status: 0})
						})
					}
				})
				.catch((err)=>{
					console.log(err)
					return res.send({status: 0})
				})
			}			
		}
	})
	.catch((err)=>{
		console.log(err)
	})	

	
});

router.post('/login', (req, res) => {
	let {email, password, recaptchaToken} = req.body

	//google 驗證 
	let SECRET_KEY = "6LdhUXYgAAAAALphUmr8aD5p7-8kPOJssDMCYYv-"


	axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body['recaptchaToken']}`)
	.then((apiRes)=>{
		if(apiRes.data.success == 1){
			// 判斷是否符合建立規則
			const reemail = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
			const repassword = /^[a-zA-Z0-9]+$/;

			if (email == '' || !reemail.test(email) || password == '' || !repassword.test(password)) {
				return res.send({status: 0})  	
			}
			else{
			User.findOne({where: {email}})	// 判斷使用者是否已經註冊
				.then((user)=>{
			        if (!user) {
			          return res.send({status: 0})
			        }
			        bcryptjs
			            .compare(password, user.password)
			            .then((isMatch) => {
			                if (isMatch) {
			                	req.session.user = user;
			                	req.session.email = email;
			                	return res.send({
			                		status: 1,
			                		userName: user.name,
			                		userId: user.id
			                	})
			                }
			                else{
			                	return res.send({status: 0})
			                }
			            })
			            .catch((err) => {
			            	return res.send({status: 0})
			            })		            
				})	
			}
		}
		else{
			return res.send({status: 0})
		}
	})
	.catch((err)=>{
		console.log(err)
	})
});

// 登出刪除session
router.post('/logout', (req, res) => {
	req.session.destroy();
	return res.send({status: 1})
});


//需要有登入才可以顯示,
router.get('/shopcart', isLogin, (req, res) => {
  res.status(200).sendFile(path.join(rootPath, 'dist', 'index.html'));
})

router.get('/member', isLogin, (req, res) => {
    res.status(200).sendFile(path.join(rootPath, 'dist', 'index.html'));
})

router.get('/checkout', isLogin, (req, res) => {
    res.status(200).sendFile(path.join(rootPath, 'dist', 'index.html'));
})

router.get('/order', isLogin, (req, res) => {
    res.status(200).sendFile(path.join(rootPath, 'dist', 'index.html'));
})


router.get('/authApi', (req, res) => {
	if (req.session.email) {
		console.log('authenticated')
		return res.send({status: 1,})
	} 
	else {
		console.log('not authenticated')
		return res.send({status: 0})
	}    
});

module.exports = router;