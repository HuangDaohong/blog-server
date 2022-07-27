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
},
  {
    freezeTableName: true, 
  }
);
// Tag.sync({ alter: true })

module.exports = Tag;