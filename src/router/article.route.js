const Router = require('koa-router');
const { verifyIsExisted } = require('../middleware/article.middleware');
const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');
const { add, getAll,getAllByCategory } = require('../controller/article.controller');

const router = new Router({ prefix: '/article' });

// 新增文章
router.post(
  '/',
  auth,
  hadAdminPermission,
  validator({
    title: { type: 'string', required: true },
    category_id: { type: 'number', required: true },
    tag_ids: { type: 'array', required: true },
  }),
  verifyIsExisted,
  add
);

// 获取文章列表
router.get('/all',getAll);

// 分页获取文章列表
router.get('/', );

// 根据文章id获取文章，views+1
router.get('/:id');

// 根据分类id获取文章
router.get('/category/:id',getAllByCategory);

// 根据标签id获取文章
router.get('/tag/:id');

// 根据作者id获取文章
router.get('/author/:id');

// 根据id删除文章
router.delete('/:id');

// 批量删除文章
router.delete('/');

// 根据id更新文章
router.put('/:id');

// 更新文章访问量
router.patch('/:id/view');

// 更新文章点赞量
router.patch('/:id/like');

module.exports = router;
