const bcrypt = require('bcryptjs'); //加密，比md5高级
const KoaBody = require('koa-body');
const path = require('path');
const { getUserInfo, getLoginUserInfo, getLoginUserInfo2, getUserInfoByID } = require('../service/user.service');
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
  userUpdateError,
  invalidOldPassword,
  UNKNOWN_ERROR,
  hasNotAdminPermission,
  invalidCode,
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

// 用户名和邮箱是否存在
const verifyUser = async (ctx, next) => {
  const { name, email } = ctx.request.body;
  const { id } = ctx.params;
  try {
    // 判断修改的用户
    if (Number(id) !== ctx.state.user.id) {
      if (ctx.state.user.role !== 1) return ctx.app.emit('error', hasNotAdminPermission, ctx);
    }
    // 校验数据
    const res = await getUserInfo({ name, email, id });
    if (res) {
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    return ctx.app.emit('error', userUpdateError, ctx, err);
  }

  await next();
};

const verifyUserCreate = async (ctx, next) => {
  const { name, email } = ctx.request.body;
  try {
    const res = await getLoginUserInfo2({ name, email });
    if (res) {
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
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
    return ctx.app.emit('error', userRegisterError, ctx);
  } else {
    //生成盐
    const salt = bcrypt.genSaltSync(10);
    // hash保存的是密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;

    await next();
  }
};

const verifyPass = async (ctx, next) => {
  const { password } = ctx.request.body;
  const { id } = ctx.params;
  try {
    // 1、判断修改的用户
    console.log(ctx.state.user);
    if (Number(id) !== ctx.state.user.id) {
      if (ctx.state.user.role !== 1) {
        return ctx.app.emit('error', hasNotAdminPermission, ctx);
      }
    }

    const res = await getUserInfoByID({ id });
    if (!res) {
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidOldPassword, ctx);
      return;
    }
    ctx.request.body.password = ctx.request.body.newPassword;
  } catch (err) {
    return ctx.app.emit('error', UNKNOWN_ERROR, ctx);
  }

  await next();
};

const verifyLogin = async (ctx, next) => {
  // 判断用户或邮箱是否存在(不存在:报错)
  const { name, password } = ctx.request.body;

  try {
    const res = await getLoginUserInfo({ name });
    if (!res) {
      return ctx.app.emit('error', userDoesNotExist, ctx);
    }
    // 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', invalidPassword, ctx);
    }
  } catch (err) {
    return ctx.app.emit('error', userLoginError, ctx);
  }

  await next();
};

const verfyMailCode = async (ctx, next) => {
  // console.log(ctx.request.body);
  // console.log(ctx.session.code);
  // console.log('@@@');

  const { code } = ctx.request.body;
  if (code !== ctx.session.code) {
    return ctx.app.emit('error', invalidCode, ctx);
  }

  await next();
};

// 最好在app/index.js中定义
const koabodysettings = KoaBody({
  multipart: true, // 支持文件上传
  encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, '../upload/'),
    keepExtensions: true, //保持后缀名
    multipart: false, //不支持多文件
    maxFieldsSize: 200 * 1024 * 1024, // 文件上传大小限制
    // onFileBegin: (name, file) => { //文件上传前的一些设置操作
    // file.filepath = path.join(__dirname, '../upload/' + '11.jpg');
    // }

    // 禁止上传非图片文件,曲线救国，把非图片文件都重新替换成 errorHandler.jpg
    // 头像上传成功 errorHandler.jpg就会消失
    onFileBegin: (name, file) => {
      const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/bmp', 'image/webp'];

      if (!fileTypes.includes(file.mimetype)) {
        file.filepath = path.join(__dirname, '../upload/' + 'errorHandler.jpg');
      }
    },
  },
});

module.exports = {
  userValidator,
  // userValidatorLogin,
  verifyUser,
  crpytPassword,
  verifyLogin,
  koabodysettings,
  verifyPass,
  verifyUserCreate,
  verfyMailCode,
};
