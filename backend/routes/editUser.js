// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const isLogin = require("../AuthGuard/isLogin.js")// 使用資料庫
const rootPath = path.resolve(__dirname,'..'); //取得上一層路徑位置  


const router = express.Router();

router.post('/editUserInfo', (req, res) => {
	let {id, name, phone, email} = req.body

	// 判斷輸入是否符合規則
	const rename =/^[a-zA-Z0-9]+$/;
	const rephone = /^09\d{8}$/;
	const reemail = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;

	if (name == '' || !rename.test(name) || phone == '' || !rephone.test(phone) || email == '' || !reemail.test(email)) {
		return res.send({status: 0})  	
	}
	else{
		User.findOne({where: {id}})	// 判斷使用者是否已經註冊
			.then((user)=>{  
				// 判斷使否有修改email
				if(user.email == email){
					user.update({
						name: name,
						phone: phone,
						email: email
					})
					.then(()=>{
						return res.send({status: 1})
					})
					.catch((err)=>{
						console.log(err)
						return res.send({status: 0})
					})   				
				}
				// 修改email檢查是否已經有該使用者
				else{
					User.findOne({where: {email}})
						.then((exist)=>{
							if(exist){
								// 前端提醒該信箱已經註冊過
								return res.send({status: 2})
							}
							else{
								user.update({
									name: name,
									phone: phone,
									email: email
								})
								.then(()=>{
									return res.send({status: 1})
								})
								.catch((err)=>{
									console.log(err)
									return res.send({status: 0})
								})   																
							}
						})
						.catch((err)=>{
							console.log(err)
							return res.send({status: 0})
						})  					
				} 
			})
			.catch((err)=>{
				console.log(err);
				res.send({status: 0})
			})
		} 		
});

module.exports = router;