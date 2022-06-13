const Sequelize = require('sequelize'); 

const database = new Sequelize('demo', 'root', '1234', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = database;