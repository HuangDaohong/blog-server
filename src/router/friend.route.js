const Router = require('koa-router');

const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { add, finAll, deleteFriend, updateFriend, findOne } = require('../controller/friend.controller');

const router = new Router({ prefix: '/friend' });

// 添加友链
router.post('/', auth, hadAdminPermission, add);

// 获取友链列表
router.get('/', finAll);

// 获取友链详情
router.get('/:id', findOne);

// // 删除友链
router.delete('/:id', auth, hadAdminPermission, deleteFriend);

// 修改友链
router.put('/:id', auth, hadAdminPermission, updateFriend);

module.exports = router;
