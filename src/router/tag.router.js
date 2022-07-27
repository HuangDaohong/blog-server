const Router = require('koa-router');

const { verifyIsExisted } = require('../middleware/tag.middleware');

const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');
const {
  add,
  finAll,
  deleteTag,
  updateTag
} = require('../controller/tag.controller');

const router = new Router({ prefix: '/tags' });

// 添加标签 {tag:name}
router.post(
  '/addtag',
  auth,
  validator({
    name: 'string',
    description: { type: 'string', required: false },
  }),
  verifyIsExisted,
  hadAdminPermission,
  add
);

// 获取标签列表
router.get('/', auth, finAll);

// TODO 删除之后，文章设置表也应该删除对应的记录
// 删除标签{id} 
router.post('/delete', auth, hadAdminPermission, deleteTag);

// TODO 
// 修改标签 {id,?name,?description}
router.post(
  '/update',
  auth,
  validator({
    name: { type: 'string', required: false },
    description: { type: 'string', required: false },
  }),
  verifyIsExisted,
  hadAdminPermission,
  updateTag
);



module.exports = router; 