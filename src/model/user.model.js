const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const User = seq.define('tb_user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一',
  },
  password: {
    type: DataTypes.CHAR(32),
    allowNull: false,
    comment: '密码',
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '头像',
  },
  email: {
    type: DataTypes.STRING(20)
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    get () {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    get () {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
},
  {
    freezeTableName: true, //创建的表名不会加复数
  }
);
// 执行：node src/model/user.model.js 或者 nodemon刷新时执行
// User.sync({ alter: true })


module.exports = User;
