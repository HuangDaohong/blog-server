/*
 * @Author: huang
 * @Date: 2022-07-25 19:34:28
 * @Description: 用户表
 */

const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const User = seq.define(
  'tb_user',
  {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '用户名, 唯一',
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
      comment: '密码',
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: '头像',
    },
    email: {
      type: DataTypes.STRING(50),
      // allowNull: false,
    },
    role: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '用户权限, 0-普通用户 1- admin',
    },
    ip: {
      type: DataTypes.STRING(50),
      comment: '用户注册ip',
    },
    address: {
      type: DataTypes.STRING(50),
      comment: '用户地址',
    },
    client: {
      type: DataTypes.STRING(255),
      comment: '用户客户端',
    },
    disabledDiscuss: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '是否禁止发言 0-可以发言, 1-禁止发言',
    },
  },
  {
    freezeTableName: true,
  }
);
// node src/model/user.model.js
// User.sync({ force: true });
// User.sync({ alter: true });

module.exports = User;
