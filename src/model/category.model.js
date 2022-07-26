const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Category = seq.define('tb_category', {

  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '分类名称'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '分类描述'
  },
},
  {
    freezeTableName: true, 
  }
);
// Category.sync({ alter: true })

module.exports = Category;