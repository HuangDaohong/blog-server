const Router = require('koa-router');

const { verifyIsExisted } = require('../middleware/category.middleware');
const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');
const {
  add,
  finAll,
  deleteCategory,
  updateCategory
} = require('../controller/category.controller');

const router = new Router({ prefix: '/category' });


// 添加分类 {tag:name}
router.post(
  '/addcategory',
  auth,
  validator({
    name: 'string',
    description: { type: 'string', required: false },
  }),
  verifyIsExisted,
  hadAdminPermission,
  add
);

// 获取分类列表
router.get('/', auth, finAll);

// TODO 删除之后，文章设置表也应该删除对应的记录
// 删除分类{id} 
router.post('/delete', auth, hadAdminPermission, deleteCategory);

// TODO 
// 修改分类 {id,?name,?description}
router.post(
  '/update',
  auth,
  validator({
    name: { type: 'string', required: false },
    description: { type: 'string', required: false },
  }),
  verifyIsExisted,
  hadAdminPermission,
  updateCategory
);



module.exports = router; 