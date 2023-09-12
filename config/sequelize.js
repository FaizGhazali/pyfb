const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pyfb_db', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;
