const Sequilize = require('sequelize');

const sequelize = require('../util/database')

const User = sequelize.define('user', {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequilize.STRING,
    allowNull: false,
  }
})

module.exports = User;