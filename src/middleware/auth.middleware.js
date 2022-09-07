const jwt = require('jsonwebtoken');
const moment = require('moment');
const { JWT_SECRET } = require('../config/config.default');
const {
  tokenExpiredError,
  invalidToken,
  noToken,
  hasNotAdminPermission,
  UNKNOWN_ERROR,
  PARAM_ERROR,
} = require('../constant/err.type');

const auth = async (ctx, next) => {
  const token = ctx.request.headers['token'];
  try {
    if (!token) {
      return ctx.app.emit('error', noToken, ctx);
    }
    // 鉴权
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err);
        return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        console.error('无效的token', err);
        return ctx.app.emit('error', invalidToken, ctx);
      default:
        console.error('未知错误', err);
        return ctx.app.emit('error', UNKNOWN_ERROR, ctx);
    }
  }

  await next();
};

const hadAdminPermission = async (ctx, next) => {
  const { role } = ctx.state.user;
  if (role !== 1) {
    return ctx.app.emit('error', hasNotAdminPermission, ctx);
  }

  await next();
};

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', PARAM_ERROR, ctx);
    }

    await next();
  };
};

module.exports = {
  auth,
  hadAdminPermission,
  validator,
};
