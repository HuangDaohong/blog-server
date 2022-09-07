const { configDataGetError } = require('../constant/err.type');
const { getConfigCountData } = require('../service/config.service');
class ConfigController {
  // 获取网站数据：文章数量、分类数量、标签数量、评论数量、友链数量
  async getCountData(ctx) {
    try {
      const res = await getConfigCountData();
      ctx.body = {
        code: 0,
        message: '获取网站数据成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', configDataGetError, ctx, err);
    }
  }
}
module.exports = new ConfigController();
