const Viewer = require('../model/viewer.model');
class ViewerService {
  // 插入访问者信息
  async createViewer(visitor) {
    // 如果最新的一条数据的ip和当前的ip相同，则不插入数据
    const { ip } = visitor;
    if (ip.length === 0 || ip === undefined || ip === null) {
      return 'false';
    }
    const last = await Viewer.findOne({
      order: [['createdAt', 'DESC']],
    });
    if (last && last.ip === ip) {
      // 更新最新的一条数据的访问时间
      await Viewer.update(
        {
          createdAt: new Date(),
          counts: last.counts + 1,
        },
        {
          where: {
            id: last.id,
          },
        }
      );
      return 'update time';
    } else {
      // 插入新的数据
      await Viewer.create(visitor);
      return 'create new';
    }
  }

  // 查询所有数据
  async finAllViewers(pageNum, pageSize) {
    const { count, rows } = await Viewer.findAndCountAll({
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
    });
    return {
      total: count,
      list: rows,
      pageNum,
      pageSize,
    };
  }
}

module.exports = new ViewerService();
