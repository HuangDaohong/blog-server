const { Sequelize } = require('sequelize');

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = require('../config/config.default');

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  timezone: '+08:00', //东八时区
  logging: false, // 是否打印sql语句

  define: {
    //全局的定义，会通过连接实例传递

    // timestamps: false,   //Sequelize动向每个模型添加 createdAt 和 updatedAt 字段
    // createdAt: 'created_at',  //自定义时间戳
    // updatedAt: 'updated_at',
    // paranoid: true,
    // deletedAt: 'deleted_at',  //paranoid表示在被告之要删除记录时并不会真正的物理上删除，而是添加一个存有删除请求时间戳deletedAt的特殊字段。
    // 把驼峰命名转换为下划线
    //underscored: false,
    pool: {
      // 使用连接池
      max: 5, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      acquire: 30000,
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },

    //配置(好像没啥用啊):如果没有加 dialectOptions 配置上的 typeCast 属性值为 true的话，返回的时间是 ISO 标准时间日期字符。（如：'2022-04-16T15:02:08.017Z'）
    // dialectOptions: {
    //   // 时间格式化，返回字符串
    //   dateStrings: true,
    //   typeCast(field, next) {
    //     if (field.type === 'DATETIME') {
    //       return field.string();
    //     }
    //     return next();
    //   },
    // },
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
// seq.sync({ alter: true })

module.exports = seq;
