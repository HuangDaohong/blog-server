const { weblogAddError, weblogGetError, weblogDelError, weblogUpdateError } = require('../constant/err.type');
const moment = require('moment');
const {
  createWebLog,
  finAllWebLog,
  removeWebLog,
  updateWebLog,
  finAllWebLogsByPage,
  findOneById,
} = require('../service/weblog.service');

class WebLogController {
  // 插入日志
  async add(ctx) {
    let { time, content, title, backImg } = ctx.request.body;
    // console.log('@@@@@@@@@@@@@@@@@@@@', time, content, title);
    time = moment(time).format('YYYY-MM-DD HH:mm:ss');
    try {
      const res = await createWebLog({ time, content, title, backImg });
      ctx.body = {
        code: 0,
        message: '添加日志成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', weblogAddError, ctx, err);
    }
  }

  // 修改日志
  async updateWebLog(ctx) {
    let { time, content, title, backImg } = ctx.request.body;
    time = moment(time).format('YYYY-MM-DD HH:mm:ss');
    // console.log('@@@@@@@@@@@@@@@@@@@@', time, content, title);

    const { id } = ctx.params;
    try {
      const res = await updateWebLog({ time, id, content, title, backImg });
      ctx.body = {
        code: 0,
        message: '修改日志成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', weblogUpdateError, ctx, err);
    }
  }

  // 获取日志列表
  async finAll(ctx) {
    try {
      const res = await finAllWebLog();
      ctx.body = {
        code: 0,
        message: '获取日志列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', weblogGetError, ctx, err);
    }
  }

  // 分页获取日志列表
  async finAllByPage(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const res = await finAllWebLogsByPage(pageNum, pageSize);
      if (res) {
        ctx.body = {
          code: 0,
          message: '获取日志列表成功',
          data: res,
        };
      } else {
        return ctx.app.emit('error', weblogGetError, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', weblogGetError, ctx, err);
    }
  }

  // 根据id查询日志
  async findOne(ctx) {
    const { id } = ctx.params;
    try {
      const res = await findOneById(id);
      ctx.body = {
        code: 0,
        message: '查询日志成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', weblogGetError, ctx, err);
    }
  }

  // 删除日志
  async deleteWeblog(ctx) {
    const { id } = ctx.params;
    try {
      const res = await removeWebLog(id);
      ctx.body = {
        code: 0,
        message: '删除日志成功',
        data: '',
      };
    } catch (err) {
      return ctx.app.emit('error', weblogDelError, ctx, err);
    }
  }
}

module.exports = new WebLogController();
