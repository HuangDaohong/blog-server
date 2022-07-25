// sequelize文档：https://www.sequelize.com.cn/core-concepts/model-basics#%E7%9B%B4%E6%8E%A5%E6%8F%90%E4%BE%9B%E8%A1%A8%E5%90%8D
const { Sequelize } = require('sequelize');

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require('../config/config.default');

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  // logging: false,  
});

// test:  node src/db/seq.js

// seq
//   .authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch(err => {
//     console.log('数据库连接失败', err)
//   })

module.exports = seq;
