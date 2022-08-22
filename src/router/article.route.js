const Router = require('koa-router');
const { verifyIsExisted, koabodysettings, koabodyImgsettings } = require('../middleware/article.middleware');
const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');
const {
  add,
  getAll,
  getAllByCategory,
  getAllByPage,
  getAllByPage2,
  getByID,
  getAllByTag,
  getAllByKeyword,
  deleteOneByID,
  deleteManyByIDs,
  updateOneByID,
  increaseViews,
  increaseLikes,
  uploadCover,
  getByArticleID,
  uploadImgs,
  getRecommend,
} = require('../controller/article.controller');

const router = new Router({ prefix: '/article' });

// 新增文章
router.post(
  '/',
  auth,
  hadAdminPermission,
  validator({
    title: { type: 'string', required: true },
    category_id: { type: 'number', required: false },
    tag_ids: { type: 'array', required: false },
  }),
  verifyIsExisted,
  add
);

// 获取文章列表
router.get('/all', getAll);

// 分页获取文章列表 默认pageNum=1&pageSize=10
router.get('/', getAllByPage);

/* web端  获取文章列表，去掉草稿和删除的文章 */
router.get('/web/all', getAllByPage2);

/* web端 随机获取推荐文章列表 */
router.get('/web/recommend', getRecommend);

// 根据文章id获取文章详情，views+1
router.get('/:id', getByID);

// 根据article_id获取文章详情，views+1
router.get('/detail/:article_id', getByArticleID);

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
router.delete('/', auth, hadAdminPermission, deleteManyByIDs);

// 根据id更新文章
router.put('/:id', auth, hadAdminPermission, updateOneByID);

// 更新文章访问量
router.patch('/:id/view', increaseViews);

// 更新文章点赞量
router.patch('/:id/like', increaseLikes);

// 上传背景图片
router.post('/uploadcover', auth, hadAdminPermission, koabodysettings, uploadCover);

// bytemd上传文章图片
router.post('/uploadimgs', auth, hadAdminPermission, koabodyImgsettings, uploadImgs);
module.exports = router;
