// const { errLogger } = require('../app/config.log');
// const { isDev } = require('../config/config.default');

module.exports = (err, ctx, errDetail) => {
  let status = 500;
  switch (err.code) {
    case '10001':
      status = 400;
      break;
    case '10002':
      status = 409;
    case '10003':
      status = 402;
      break;
    default:
      status = 403;
  }
  ctx.status = status;
  ctx.body = err;
  // if (isDev) {
  //   console.log('==========START=========');
  //   console.log(err); // 自定义错误信息
  //   console.log(errDetail); // 错误详情信息
  //   console.log('==========END===========');
  // } else {
  //   errLogger(ctx, err, errDetail);
  // }
};
