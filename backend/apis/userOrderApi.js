// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module
const User = require("../models/user.js")// 使用資料庫
const Order = require("../models/order.js")
const OrderItem = require("../models/orderItem.js")
const Products = require('../models/products'); 
const ProductEntry = require('../models/productEntry.js')

const isLogin = require("../AuthGuard/isLogin.js")
const rootPath = path.resolve(__dirname,'..'); //取得上一層路徑位置  


const router = express.Router();

router.get('/userOrderApi', (req, res) => {
    // req.user == 當下登入的user資料
    // getOrders : 因為user和order有關聯式關係，所以sequalize可以使用getMOdelName取得資料
    req.user.getOrders()
    .then((orders) => {
        // 將該筆使用者的所有訂單的id放入ordersArr
        let ordersArr = []
        for(let i = 0; i <= orders.length - 1; i++){
            ordersArr.push({
                orderId: orders[i].id
            })
        }
        return ordersArr //回傳該筆陣列，尋找該名使用者所有訂單的商品明細
    })
    .then((result)=>{
        let promises = [] //用來包裝OrderItem.findAll所有資料
        // 尋找該名使用者每筆訂單的商品明細
        for(let i = 0; i <= result.length - 1; i++){
             promises.push(OrderItem.findAll({
                where: {
                    orderId: result[i].orderId
                }
            }))
        }
        // 等待該名使用者所有訂單明細都獲得後，'回傳該名使用者所有訂單的明細
        Promise.all(promises)
        .then((resultArr)=>{
            return res.send(JSON.stringify(resultArr))
        })
    })
    .catch((err) => console.log(err));
})

module.exports = router;