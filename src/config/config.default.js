const dotdev = require('dotenv');//将.env文件中的配置文件转为 process.env变量的值。

dotdev.config();

// console.log(process.env.APP_PORT);

module.exports = process.env;