const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Tag = seq.define('tb_tag', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '标签名称'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: '暂无描述',
    comment: '标签描述'
  },
  background: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue:'default.jpg',
    comment: '标签背景图'
  },
  color: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue:'#808080',
    comment: '标签颜色'
  }
},
  {
    freezeTableName: true, 
  }
);
// Tag.sync({ alter: true })

module.exports = Tag;