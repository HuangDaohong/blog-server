const Router = require('koa-router');

const { verifyIsExisted } = require('../middleware/category.middleware');
const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');
const {
  add,
  finAll,
  deleteCategory,
  updateCategory,
  findOne,
  finAllByPage,
} = require('../controller/category.controller');

const router = new Router({ prefix: '/category' });

// 添加分类 {tag:name}
router.post(
  '/',
  auth,
  hadAdminPermission,
  validator({
    name: 'string',
    description: { type: 'string', required: false },
  }),
  verifyIsExisted,
  add
);

// 根据id获取分类
router.get('/:id', findOne);

// 获取分类列表
router.get('/get/allcategory', finAll);

// 分页获取分类列表
router.get('/', finAllByPage);

// TODO 删除之后，文章也应该处理
// 删除分类{id}
router.post('/delete', auth, hadAdminPermission, deleteCategory);

// 修改分类
router.post(
  '/update',
  auth,
  hadAdminPermission,
  validator({
    name: { type: 'string', required: false },
    description: { type: 'string', required: false },
  }),
  verifyIsExisted,
  updateCategory
);

module.exports = router;
