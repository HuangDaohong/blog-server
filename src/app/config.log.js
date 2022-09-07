// https://www.bilibili.com/video/BV1hZ4y1V7f7/?spm_id_from=333.788.recommend_more_video.-1&vd_source=eac7ee3e188e81d32edf392ab1aa352c
// https://developer.aliyun.com/article/995700
const log4js = require('log4js');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');

log4js.configure({
  appenders: {
    error: {
      // 错误日志
      category: 'errorLogger', // logger名称
      type: 'dateFile', // 日志类型
      filename: 'logs/error/error', // 您要写入日志文件的路径
      pattern: 'yyyy-MM.log', //（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      alwaysIncludePattern: true, //（默认为false） - 将模式包含在当前日志文件的名称以及备份中
    },
    response: {
      // 响应日志
      category: 'responseLogger',
      type: 'dateFile',
      filename: 'logs/response/response',
      pattern: 'yyyy-MM.log',
      alwaysIncludePattern: true,
    },
  },
  categories: {
    error: { appenders: ['error'], level: 'error' }, // 错误日志,只输出error及以上级别的日志
    response: { appenders: ['response'], level: 'info' }, // 响应日志,只输出info及以上级别的日志
    default: { appenders: ['response'], level: 'info' }, // 默认日志,只输出info及以上级别的日志
  },
});

/* 下面的做法不好 */
// function errLogger(content) {
//   // 生成一个error类型的日志记录器
//   const log = log4js.getLogger('error');
//   log.error(content);
// }
// function resLogger(content) {
//   const log = log4js.getLogger('response');
//   log.info(content);
// }
// module.exports = { errLogger, resLogger };

let logger = {};
// 自定义输出格式，确定哪些内容输出到日志文件中
const formatError = (ctx, errConfig, errDetail) => {
  const { method, url } = ctx;
  let body = ctx.request.body;

  // const user = ctx.state.user;//经过auth中间件后，ctx.state.user才有值

  const token = ctx.request.headers['token'];
  let user = {};
  if (token) {
    user = jwt.verify(token, JWT_SECRET);
  }
  // 将请求方法，请求路径，请求体，登录用户，错误信息
  return { method, url, body, user, errConfig, errDetail };
};

const formatRes = (ctx, costTime) => {
  const {
    ip,
    method,
    url,
    response: { status, message },
    request: {
      header: { token },
    },
  } = ctx;
  let body = ctx.request.body;
  const user = ctx.state.user;

  // 将请求方法，请求路径，请求体，登录用户，请求消耗时间，请求头中的token，响应体中的状态码，消息，以及自定义的响应状态
  return { ip, method, url, body, user, costTime, token, response: { status, message } };
};

let errLogger = log4js.getLogger('error'); // 生成一个error类型的日志记录器
let resLogger = log4js.getLogger('response');

// 封装错误日志
logger.errLogger = (ctx, errConfig, errDetail) => {
  if (ctx && errConfig && errDetail) {
    errLogger.error(formatError(ctx, errConfig, errDetail));
  }
};

// 封装响应日志
logger.resLogger = (ctx, resTime) => {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};

module.exports = logger;
