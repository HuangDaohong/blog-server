const WebLog = require('../model/weblog.model');
class WebLogService {
  // 插入日志
  async createWebLog(weblog) {
    return await WebLog.create(weblog);
  }

  // 修改日志
  async updateWebLog(weblog) {
    const res = await WebLog.update(weblog, {
      where: { id: weblog.id },
    });
    return res[0];
  }

  // 获取日志列表
  async finAllWebLog() {
    return await WebLog.findAndCountAll({
      attributes: ['id', 'time', 'content', 'title'],
      order: [['time', 'DESC']],
    });
  }

  // 分页获取日志列表
  async finAllWebLogsByPage(pageNum, pageSize) {
    const { count, rows } = await WebLog.findAndCountAll({
      attributes: ['id', 'time', 'content', 'title'],
      limit: pageSize * 1,
      offset: (pageNum - 1) * pageSize,
      order: [['time', 'DESC']],
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  // 根据id获取日志
  async findOneById(id) {
    return await WebLog.findOne({
      attributes: ['id', 'time', 'content', 'title'],
      where: { id },
    });
  }

  // 删除日志
  async removeWebLog(id) {
    const res = await WebLog.destroy({
      where: { id },
    });
    return res === 1 ? true : false;
  }
}
module.exports = new WebLogService();
