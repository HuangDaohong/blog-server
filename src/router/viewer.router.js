const Router = require('koa-router');

const { add, finAll } = require('../controller/viewer.controller');

const router = new Router({ prefix: '/viewer' });

// 添加
router.post('/', add);

// 分页获取列表
router.get('/', finAll);

module.exports = router;
