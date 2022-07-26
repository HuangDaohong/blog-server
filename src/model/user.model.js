/*
 * @Author: huang
 * @Date: 2022-07-25 19:34:28
 * @Description: 用户表
 */

const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const User = seq.define('tb_user', {
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码',
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '头像',
  },
  email: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  role: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: '用户权限, 0-普通用户 1- admin'
  },
  ip: {
    type: DataTypes.STRING(50),
    comment: '用户注册ip'
  },
  disabledDiscuss: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: '是否禁止发言 0-可以发言, 1-禁止发言'
  },
},
  {
    freezeTableName: true,
  }
);
// node src/model/user.model.js
// User.sync({ force: true });

module.exports = User;