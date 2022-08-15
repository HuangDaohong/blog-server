const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const {
  createUser,
  getUserInfo,
  updateById,
  deleteById,
  getUserList,
  getUserListPage,
  getLoginUserInfo,
} = require('../service/user.service');
const {
  userRegisterError,
  unSupportedFileType,
  fileUploadError,
  getUserInfoError,
  userLoginError,
} = require('../constant/err.type');

const { JWT_SECRET } = require('../config/config.default');

class UserController {
  async register(ctx, next) {
    try {
      const res = await createUser(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        data: res,
      };
    } catch (err) {
      console.log('注册失败');
      return ctx.app.emit('error', userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    const { name, email } = ctx.request.body;

    try {
      const { password, ...res } = await getLoginUserInfo({ name, email });
      res.token = jwt.sign(res, JWT_SECRET, { expiresIn: '7d' });
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', userLoginError, ctx);
    }
  }

  // 修改用户信息 ,修改之后客户端应重新登录
  async updateUserInfomation(ctx, next) {
    const { id } = ctx.params;
    if (await updateById(id, ctx.request.body)) {
      ctx.body = {
        code: 0,
        message: '修改信息成功',
        data: '',
      };
    } else {
      ctx.body = {
        code: '1',
        message: '修改密码失败',
        data: '',
      };
    }
  }

  // 修改密码
  async updateUserPassword(ctx) {
    const { id } = ctx.params;
    try {
      if (await updateById(id, ctx.request.body)) {
        ctx.body = {
          code: 0,
          message: '修改信息成功',
          data: '',
        };
      } else {
        ctx.body = {
          code: '1',
          message: '修改密码失败',
          data: '',
        };
      }
    } catch (err) {
      return ctx.app.emit('error', userUpdateError, ctx);
    }
  }
  // 用户上传头像接口
  async uploadAvatar(ctx) {
    const { id } = ctx.state.user;
    const { avatar_Img } = ctx.request.files || {};

    const fileTypes = ['image/jpeg', 'image/png'];
    if (avatar_Img) {
      if (!fileTypes.includes(avatar_Img.mimetype)) {
        // 删除上传的非图文件
        // try {
        //   const delfile = path.join(__dirname, '../upload/', avatar_Img.newFilename);
        //   fs.unlinkSync(delfile);
        return ctx.app.emit('error', unSupportedFileType, ctx);
        // } catch {
        //   return ctx.app.emit('error', fileUploadError, ctx);
        // }
      }

      // 文件名 *.jpg
      const filename = avatar_Img.newFilename;
      // 后缀 .jpg
      const suffix = filename.substring(filename.lastIndexOf('.'));
      const new_avatarname = ctx.state.user.name + '-avatar' + suffix;
      fs.rename(
        ctx.request.files.avatar_Img.filepath,
        path.join(__dirname, '../upload/' + new_avatarname),
        function (err) {
          if (err) throw err;
        }
      );

      await updateById({ id, avatar: new_avatarname });
      ctx.body = {
        code: 0,
        message: '图片上传成功',
        data: {
          avatar_Img: new_avatarname,
        },
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }

  // 管理员删除用户
  async deleteUser(ctx, next) {
    const { id } = ctx.params;
    if (await deleteById({ id })) {
      ctx.body = {
        code: 0,
        message: '删除用户成功',
        data: '',
      };
    } else {
      ctx.body = {
        code: '1',
        message: '删除用户失败',
        data: '',
      };
    }
  }

  // 禁言某用户
  async disableusercomment(ctx) {
    const { id } = ctx.request.body;
    if (await updateById({ id, disabledDiscuss: 1 })) {
      ctx.body = {
        code: 0,
        message: '禁言用户成功',
        data: '',
      };
    } else {
      ctx.body = {
        code: '1',
        message: '禁言用户失败',
        data: '',
      };
    }
  }

  // 获取用户详细信息
  async getUserInfo(ctx) {
    const { id } = ctx.request.body;
    try {
      const { password, ...res } = await getUserInfo({ id });
      ctx.body = {
        code: 0,
        message: '获取用户详细信息成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', getUserInfoError, ctx);
    }
  }

  // 获取用户列表
  async getUserList(ctx) {
    let res = await getUserList();
    if (res) {
      ctx.body = {
        code: 0,
        message: '获取用列表户成功',
        data: res,
      };
    } else {
      ctx.body = {
        code: '1',
        message: '获取用户列表失败',
        data: '',
      };
    }
  }

  // 获取用户列表 分页
  async getUserListByPage(ctx) {
    let { pageNum = 1, pageSize = 5 } = ctx.request.query;
    let res = await getUserListPage({ pageNum, pageSize });
    if (res) {
      ctx.body = {
        code: 0,
        message: '获取用户列表户成功',
        data: res,
      };
    } else {
      ctx.body = {
        code: '1',
        message: '获取用户列表失败',
        data: '',
      };
    }
  }
}

module.exports = new UserController();
