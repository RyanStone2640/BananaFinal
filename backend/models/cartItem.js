const Sequelize = require('sequelize');

const database = require('../utils/database');


const CartItem = database.define('cartItem', {
    id: { 
        type: Sequelize.INTEGER, // 資料的型別
        autoIncrement: true, // 資料是否會自動增加（一般用於 id）
        allowNull: false, // 是否接受 null 值
        primaryKey: true, // 是否為 Primary Key
      },
   quantity: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
    },
   bananaproductId: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
    }
});

module.exports = CartItem;