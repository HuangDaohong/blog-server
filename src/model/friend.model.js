/**
 * @description: 友链模型
 */
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Friend = seq.define(
  'tb_friend',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '友链名称, 唯一',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '友链地址',
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '友链logo',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '友链描述',
    }
  },
  {
    freezeTableName: true,
    comment: '友链表',
  }
);
// node src/model/friend.model.js
// Friend.sync({ alter: true });
module.exports = Friend;
