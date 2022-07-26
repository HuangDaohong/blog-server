const jwt = require('jsonwebtoken');
const KoaBody = require('koa-body');
const path = require('path');

const {
  createUser,
  getUserInfo,
  updateById,
  deleteById,
  getUserList,
  getUserListPage,
} = require('../service/user.service');
const { userRegisterError, unSupportedFileType, fileUploadError } = require('../constant/err.type');

const { JWT_SECRET } = require('../config/config.default');

class UserController {


  async register (ctx, next) {
    // 1. 获取数据
    const { name, password, email } = ctx.request.body;
    // 2. 操作数据库
    try {
      const res = await createUser(name, password, email);
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          name: res.name,
          email: res.email,
        },
      };
    } catch (err) {
      ctx.app.emit('error', userRegisterError, ctx);
    }
  }


  async login (ctx, next) {
    const { name, email } = ctx.request.body;

    try {
      const { password, ...res } = await getUserInfo({ name, email });
      res.token = jwt.sign(res, JWT_SECRET, { expiresIn: '2d' });
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: res
      };
    } catch (err) {
      console.error('用户登录失败', err);
    }
  }


  // 修改用户信息 ,修改之后客户端应重新登录
  async updateUserInfomation (ctx, next) {
    const { id } = ctx.state.user;
    console.log(ctx.state.user);
    const { name, password, email, avatar } = ctx.request.body;
    if (await updateById({ id, name, password, email, avatar })) {
      ctx.body = {
        code: 0,
        message: '修改信息成功',
        result: ''
      };
    } else {
      ctx.body = {
        code: '1',
        message: '修改密码失败',
        result: '',
      };
    }
  }

  // 用户上传头像接口
  async uploadAvatar (ctx) {
    // console.log('@@@',ctx.request.files);
    const { id } = ctx.state.user;
    const { avatar_Img } = ctx.request.files || {};
    const fileTypes = ['image/jpeg', 'image/png'];
    if (avatar_Img) {
      if (!fileTypes.includes(avatar_Img.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx);
      }
      await updateById({ id, avatar: avatar_Img.newFilename });
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          avatar_Img: avatar_Img.newFilename,
        },
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }

  // 管理员删除用户
  async deleteUser (ctx, next) {
    const { id } = ctx.request.body;
    if (await deleteById({ id })) {
      ctx.body = {
        code: 0,
        message: '删除用户成功',
        result: ''
      };
    } else {
      ctx.body = {
        code: '1',
        message: '删除用户失败',
        result: '',
      };
    }
  }

  // 禁言某用户
  async disableusercomment (ctx) {
    const { id } = ctx.request.body;
    if (await updateById({ id, disabledDiscuss: 1 })) {
      ctx.body = {
        code: 0,
        message: '禁言用户成功',
        result: ''
      };
    } else {
      ctx.body = {
        code: '1',
        message: '禁言用户失败',
        result: '',
      };
    }
  }

  // 获取用户详细信息
  async getUserInfo (ctx) {
    const { id } = ctx.request.body;
    try {
      const { password, ...res } = await getUserInfo({ id });
      ctx.body = {
        code: 0,
        message: '获取用户详细信息成功',
        result: res
      };
    } catch (err) {
      console.error('获取用户详细信息失败', err);
    }
  }

  // 获取用户列表
  async getUserList (ctx) {
    let res = await getUserList();
    if (res) {
      ctx.body = {
        code: 0,
        message: '获取用列表户成功',
        result: res
      };
    } else {
      ctx.body = {
        code: '1',
        message: '获取用户列表失败',
        result: '',
      };
    }
  }

  // 获取用户列表 分页
  async getUserListByPage (ctx) {
    let { pageNum = 1, pageSize = 5 } = ctx.request.body;
    let res = await getUserListPage({ pageNum, pageSize });
    if (res) {
      ctx.body = {
        code: 0,
        message: '获取用户列表户成功',
        result: res
      };
    } else {
      ctx.body = {
        code: '1',
        message: '获取用户列表失败',
        result: '',
      };
    }
  }
}

module.exports = new UserController();