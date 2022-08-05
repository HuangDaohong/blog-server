const Router = require('koa-router');
const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');

const { add, getOne, getAll, getAllByPage, deleteMany, deleteOne,updateOne } = require('../controller/comment.controller');

const router = new Router({ prefix: '/comment' });

// 新增评论
router.post(
  '/',
  auth,
  validator({
    // user_id: { type: 'number', required: true }, //使用state.user.id
    article_id: { type: 'number', required: true },
  }),
  add
);

// 获取指定评论
router.get('/:id', auth, hadAdminPermission, getOne);

// 获取评论列表
router.get('/all', getAll);

// 分页获取评论列表
router.get('/', getAllByPage);

// 批量删除评论  {"ids": [1,2,3]}
router.delete('/', auth, hadAdminPermission, deleteMany);

// 删除评论
router.delete('/:id', auth, hadAdminPermission, deleteOne);

// 根据id更新评论
router.put(
  '/:id',
  auth,
  hadAdminPermission,
  updateOne
);

module.exports = router;
