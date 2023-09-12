const { DataTypes } = require('sequelize');
let sequelize;

try {
  sequelize = require('../config/sequelize');
} catch (error) {
  console.error('Error initializing sequelize:', error);
}
if(sequelize){
  const Sensor = sequelize.define('Sensor', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    value1: DataTypes.STRING(10),
    value2: DataTypes.STRING(10),
    value3: DataTypes.STRING(10),
    reading_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  });
  module.exports = Sensor;
}else{
  module.exports = null; // Or handle the absence of sequelize in an appropriate way
}