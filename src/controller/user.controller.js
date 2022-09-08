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
  getUserInfoByName,
} = require('../service/user.service');
const {
  userRegisterError,
  unSupportedFileType,
  fileUploadError,
  getUserInfoError,
  userLoginError,
  sendCodeError,
  invalidCode,
} = require('../constant/err.type');

const { sendMail } = require('../config/sendEmail');
const { JWT_SECRET } = require('../config/config.default');
const { QQgetAccessToken, getOpenId, QQgetUserInfo } = require('../config/qq');
class UserController {
  async register(ctx) {
    try {
      const res = await createUser(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        data: res,
      };
    } catch (err) {
      console.log('注册失败');
      return ctx.app.emit('error', userRegisterError, ctx, err);
    }
  }

  async login(ctx) {
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
      return ctx.app.emit('error', userLoginError, ctx, err);
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
      return ctx.app.emit('error', userUpdateError, ctx, err);
    }
  }
  // 用户上传头像接口
  async uploadAvatar(ctx) {
    // const { id } = ctx.state.user;
    const { avatar_Img } = ctx.request.files || {};

    const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/bmp', 'image/webp'];
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
      const new_avatarname = avatar_Img.newFilename;
      // 后缀 .jpg
      // const suffix = filename.substring(filename.lastIndexOf('.'));
      // const new_avatarname = ctx.state.user.name + '-avatar' + suffix;
      fs.rename(
        ctx.request.files.avatar_Img.filepath,
        path.join(__dirname, '../upload/' + new_avatarname),
        function (err) {
          if (err) throw err;
        }
      );

      // await updateById({ id, avatar: new_avatarname });
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
      return ctx.app.emit('error', getUserInfoError, ctx, err);
    }
  }

  async getUserInfoByName(ctx) {
    const { name } = ctx.request.query;
    try {
      const { password, ...res } = await getUserInfoByName({ name });
      ctx.body = {
        code: 0,
        message: '获取用户详细信息成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', getUserInfoError, ctx, err);
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
    let { pageNum = 1, pageSize = 10 } = ctx.request.query;
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

  async getEmailCode(ctx) {
    const { email } = ctx.request.body;
    const code = Math.random().toString().slice(-6);
    // 在会话中添加验证码字段code
    ctx.session.code = code;
    try {
      const res = await sendMail(
        email,
        '验证码',
        '验证码',
        `<div >
        <p>您好,您正在注册Huang Blog博客帐号,
        验证邮箱为<b>${email}</b>
        </p>
        您的验证码为：
        <p style="color: green;font-weight: 600;margin: 0 6px;text-align: center; font-size: 20px">
          ${code}
        </p>
        <p>请在三分钟内在注册页面填写。</p>
        <p>本邮件为自动发送，无须回复。</p>
       </div>`
      );
      if (res) {
        ctx.body = {
          code: 0,
          message: '发送验证码成功',
          data: '',
        };
      } else {
        ctx.body = {
          code: '1',
          message: '发送验证码失败',
          data: '',
        };
      }
    } catch (err) {
      return ctx.app.emit('error', sendCodeError, ctx, err);
    }
  }

  // async verfyMailCode(ctx, next) {
  //   console.log(ctx.request.body);
  //   console.log(ctx.session.code);
  //   console.log(ctx.session);
  //   console.log('@@@');

  //   const { code } = ctx.request.body;
  //   if (code !== ctx.session.code) {
  //     return ctx.app.emit('error', invalidCode, ctx);
  //   }

  //   await next();
  // }

  // QQ登录
  async qqlogin(ctx) {
    const { code } = ctx.request.query;
    console.log('code', code); //点击点击“登录”，网站回调域 就会收到的腾讯服务器所发起的回调。请求 ：回调地址/GET /code=F91C6110********
    let userinfo;
    let openid;
    if (code) {
      let token = await QQgetAccessToken(code); // 获取 Access Token 函数 返回 token 并存储
      console.log('返回的token', token);
      openid = await getOpenId(token); // 获取 Openid 函数 返回 Openid 并存储
      console.log('返回的openid', openid);
      if (openid && token) {
        userinfo = await QQgetUserInfo(token, openid); // 如果都获取到了，获取用户信息
        console.log('返回的结果', userinfo);
      }
    }
    // 封装：
    if (userinfo) {
      let obj = {
        name: userinfo.nickname,
        // openid: openid,
        // gender: userinfo.gender === '男' ? 1 : 2,
        // province: userinfo.province,
        address: userinfo.city,
        // year: userinfo.year,
        avatar: userinfo.figureurl_qq_2 ? userinfo.figureurl_qq_2 : userinfo.figureurl_qq_1,
      };
      console.log('封装的obj', obj);

      // 判断是否存在
      const res2 = await getUserInfoByName({ name: obj.name });
      console.log('存在res2:', res2);
      if (res2) {
        // 存在
        res2.token = jwt.sign(res2, JWT_SECRET, { expiresIn: '7d' });

        // ctx.body = {
        //   code: 0,
        //   message: '登录成功',
        //   data: res2,
        // };
        console.log('res.id:', res2.id);
        ctx.redirect(`https://hdhblog.cn/about?qqname=${res2?.id}`);
      } else {
        let { password, ...res1 } = await createUser(obj);
        /** 从这里到封装 都是改变我获取的用户信息存储到数据库里面，根据数据库的存储，创建新用户，如果有
         * 用户我就查询并获取用户的id 然后返回给前端 用户的 id
         */
        console.log('createUser_item:', res1);
        console.log('dataValues内容:', res1.dataValues);
        let res = res1.dataValues;
        // 生成token
        const token = jwt.sign(res, JWT_SECRET, { expiresIn: '7d' });
        ctx.body = {
          code: 0,
          message: '登录成功',
          data: {
            ...res,
            token,
          },
        };
      }
    }
  }
}
module.exports = new UserController();
