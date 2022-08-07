const { Sequelize } = require('sequelize');

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = require('../config/config.default');

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  timezone: '+08:00', //东八时区
  define: {
    //全局的定义，会通过连接实例传递

    // timestamps: false,   //默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理 
    //对于带有timestamps: false 参数的模型,可以禁用此行为
    // createdAt: 'created_at',  //自定义时间戳
    // updatedAt: 'updated_at',

    // paranoid: true,
    // deletedAt: 'deleted_at',  //paranoid表示在被告之要删除记录时并不会真正的物理上删除，而是添加一个存有删除请求时间戳deletedAt的特殊字段。传递paranoid: true参数给模型定义中。paranoid要求必须启用时间戳，即必须传timestamps: true
    // 把驼峰命名转换为下划线
    //underscored: false,
    pool: {
      // 使用连接池
      max: 5, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      acquire: 30000,
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
  },
});

// 测试连接是否正常  node src/db/seq.js
// seq
//   .authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch(err => {
//     console.log('数据库连接失败', err)
//   })

// 模型同步
// sequelize.sync({ force: false })  // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作); { force: true },如果表已经存在,则将其首先删除

module.exports = seq;
