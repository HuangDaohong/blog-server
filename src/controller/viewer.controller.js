const { createViewer, finAllViewers } = require('../service/viewer.service');
const { visitorAddError, visitorGetError } = require('../constant/err.type');
class ViewerController {
  async add(ctx) {
    try {
      const res = await createViewer(ctx.request.body);
      ctx.body = {
        code: 0,
        message: 'success',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', visitorAddError, ctx, err);
    }
  }

  // 分页获取列表
  async finAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const res = await finAllViewers(pageNum, pageSize);
      ctx.body = {
        code: 0,
        message: 'success',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', visitorGetError, ctx, err);
    }
  }
}
module.exports = new ViewerController();
