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
    defaultValue: '暂无描述',
    comment: '分类描述'
  },
  background: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue:'https://img1.baidu.com/it/u=250628574,3890325305&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
    comment: '分类背景图'
  }
},
  {
    freezeTableName: true, 
  }
);
// Category.sync({ alter: true })
// Category.sync({ force: true })

module.exports = Category;