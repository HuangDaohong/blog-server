const Router = require('koa-router');
const router = new Router({ prefix: '/weblog' });

const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const {
  add,
  finAll,
  finAllByPage,
  deleteWeblog,
  updateWebLog,
  findOne
} = require('../controller/weblog.controller');
// 添加日志
router.post(
  '/',
  auth,
  hadAdminPermission,
  add
);

// 获取日志列表
router.get('/all', finAll);

// 分页获取日志列表
router.get('/', finAllByPage);

// 获取日志详情
router.get('/:id', findOne);

// 删除日志{id}
router.delete('/:id', auth, hadAdminPermission, deleteWeblog);

// 修改日志
router.put('/:id', auth, hadAdminPermission, updateWebLog);

module.exports = router;
