const Router = require('koa-router');

const { verifyIsExisted } = require('../middleware/tag.middleware');

const { auth, hadAdminPermission, validator } = require('../middleware/auth.middleware');
const { add, finAll, deleteTag, updateTag } = require('../controller/tag.controller');

const router = new Router({ prefix: '/tags' });

// 添加标签 {tag:name}
router.post(
  '/addtag',
  auth,
  hadAdminPermission,
  validator({
    name: 'string',
    description: { type: 'string', required: false },
    background: { type: 'string', required: false },
    color: { type: 'string', required: false },
  }),
  verifyIsExisted,
  add
);

// 获取标签列表
router.get('/', finAll);

// note：文章设置表会自动删除对应的article_tag表中的文章id和标签id
// 删除标签{id}
router.post('/delete', auth, hadAdminPermission, deleteTag);

// 修改标签 {id,?name,?description}
router.post(
  '/update',
  auth,
  hadAdminPermission,
  validator({
    name: { type: 'string', required: false },
    description: { type: 'string', required: false },
    background: { type: 'string', required: false },
    color: { type: 'string', required: false },
  }),
  verifyIsExisted,
  updateTag
);

module.exports = router;
