const Router = require('koa-router');
const { getCountData } = require('../controller/config.controller');
const router = new Router({ prefix: '/config' });

// 获取网站数据统计
router.get('/', getCountData);

module.exports = router;
