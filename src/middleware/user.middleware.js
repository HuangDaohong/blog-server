const bcrypt = require('bcryptjs'); //加密，比md5高级
const KoaBody = require('koa-body');
const path = require('path');
const fs = require('fs');
const { getUserInfo } = require('../service/user.service');
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require('../constant/err.type');


const userValidator = async (ctx, next) => {
  const { name, password, email } = ctx.request.body;
  // 合法性
  if (!name || !password || !email) {
    console.error('用户名或密码或邮箱为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }

  await next();
};
const userValidatorLogin = async (ctx, next) => {
  const { name, password, email } = ctx.request.body;
  // 合法性
  if (!(name || email) || !password) {
    console.error('用户名或密码或邮箱为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }

  await next();
};

// 用户名和邮箱是否存在
const verifyUser = async (ctx, next) => {
  const { name, email } = ctx.request.body;
  try {
    const res = await getUserInfo({ name, email });
    if (res) {
      console.error('用户名或邮箱已经存在', { name });
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    console.warn('获取用户信息错误', err);
    ctx.app.emit('error', userRegisterError, ctx);
    return;
  }

  await next();
};

// 密码加密
const crpytPassword = async (ctx, next) => {

  const { password } = ctx.request.body;
  // 检查密码是否存在
  if (!password) {
    await next();
  }
  else {
    //生成盐
    const salt = bcrypt.genSaltSync(10);
    // hash保存的是密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;

    await next();
  }

};

const verifyLogin = async (ctx, next) => {
  // 1. 判断用户或邮箱是否存在(不存在:报错)
  const { name, email, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ name, email });
    if (!res) {
      console.error('用户名不存在', { name });
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    // 2. 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit('error', userLoginError, ctx);
  }

  await next();
};

// 最好在app/index.js中定义
const koabodysettings = KoaBody(
  {
    multipart: true,// 支持文件上传
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, '../upload/'),
      keepExtensions: true,//保持后缀名
      multipart: false,//不支持多文件
      maxFieldsSize: 200 * 1024 * 1024, // 文件上传大小限制
      // onFileBegin: (name, file) => { //文件上传前的一些设置操作
      // file.filepath = path.join(__dirname, '../upload/' + '11.jpg');
      // }

      // 禁止上传非图片文件,曲线救国，把非图片文件都重新替换成 errorHandler.jpg
      // 头像上传成功 errorHandler.jpg就会消失
      onFileBegin: (name, file) => {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          file.filepath = path.join(__dirname, '../upload/' + 'errorHandler.jpg');
        }
      }
    }
  });

module.exports = {
  userValidator,
  userValidatorLogin,
  verifyUser,
  crpytPassword,
  verifyLogin,
  koabodysettings
};
