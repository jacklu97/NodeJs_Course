const Sequelize = require('sequelize');

const sequelize = new Sequelize('app_db', 'my_user', '123456789', 
  {
    dialect: 'mysql', 
    host: 'localhost', 
    port: '6033'
  }
);

module.exports = sequelize;