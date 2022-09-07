const {
  createFriend,
  finAllFriends,
  removeFriend,
  updateFriendByID,
  findOneById,
} = require('../service/friend.service');
const { friendAddError, friendGeterror, friendDelerror, friendUpdateError } = require('../constant/err.type');
class FriendController {
  // 添加友链
  async add(ctx) {
    try {
      const res = await createFriend(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '添加友链成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', friendAddError, ctx, err);
    }
  }

  // 获取友链列表
  async finAll(ctx) {
    try {
      const res = await finAllFriends();
      ctx.body = {
        code: 0,
        message: '获取友链列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', friendGeterror, ctx, err);
    }
  }

  // 获取友链详情
  async findOne(ctx) {
    try {
      const res = await findOneById(ctx.params.id);
      ctx.body = {
        code: 0,
        message: '获取友链详情成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', friendGeterror, ctx, err);
    }
  }

  // 删除友链
  async deleteFriend(ctx) {
    try {
      const res = await removeFriend(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: '删除友链成功',
          data: '',
        };
      } else {
        return ctx.app.emit('error', friendDelerror, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', friendDelerror, ctx, err);
    }
  }

  // 修改友链
  async updateFriend(ctx) {
    const { id } = ctx.params;
    try {
      const res = await updateFriendByID(id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改友链成功',
          data: res,
        };
      } else {
        return ctx.app.emit('error', friendUpdateError, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', friendUpdateError, ctx, err);
    }
  }
}
module.exports = new FriendController();
