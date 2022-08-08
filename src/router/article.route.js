const Router = require('koa-router');
const { verifyIsExisted } = require('../middleware/article.middleware');
const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');
const {
  add,
  getAll,
  getAllByCategory,
  getAllByPage,
  getByID,
  getAllByTag,
  getAllByKeyword,
  deleteOneByID,
  deleteManyByIDs,
  updateOneByID,
  increaseViews,
  increaseLikes,
} = require('../controller/article.controller');

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
router.get('/all', getAll);

// 分页获取文章列表 默认pageNum=1&pageSize=10
router.get('/', getAllByPage);

// 根据文章id获取文章详情，views+1
router.get('/:id', getByID);

// 根据分类id获取文章
router.get('/category/:id', getAllByCategory);

// 根据标签id获取文章
router.get('/tag/:id', getAllByTag);

// 关键字搜索文章
router.post(
  '/search',
  validator({
    keyword: { type: 'string', required: true },
  }),
  getAllByKeyword
);

// 根据id删除文章
router.delete('/:id', auth, hadAdminPermission, deleteOneByID);

// 批量删除文章
router.delete('/', auth, hadAdminPermission, validator({ ids: 'array' }), deleteManyByIDs);

// 根据id更新文章
router.put('/:id', auth, hadAdminPermission, updateOneByID);

// 更新文章访问量
router.patch('/:id/view', increaseViews);

// 更新文章点赞量
router.patch('/:id/like', increaseLikes);

module.exports = router;
