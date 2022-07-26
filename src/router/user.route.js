const Router = require('koa-router');

const {
  userValidator,
  userValidatorLogin,
  verifyUser,
  crpytPassword,
  verifyLogin,
  koabodysettings
} = require('../middleware/user.middleware');

const { auth, hadAdminPermission } = require('../middleware/auth.middleware');

const {
  register,
  login,
  updateUserInfomation,
  deleteUser,
  disableusercomment,
  getUserInfo,
  getUserList,
  getUserListByPage,
  uploadAvatar
} = require('../controller/user.controller');

const router = new Router({ prefix: '/users' });

router.get('/', async (ctx) => {
  ctx.body = 'this is a users response!';
}
);

// 注册接口  {name,email,password}
router.post('/register', userValidator, verifyUser, crpytPassword, register);

// 登录接口 {name/email,password}
router.post('/login', userValidatorLogin, verifyLogin, login);

// 修改用户信息接口{name/email/password/avatar..}
router.post('/updateuserinfo', auth, verifyUser, crpytPassword, updateUserInfomation);

// 用户上传头像接口
router.post('/uploadavatar', auth, koabodysettings, uploadAvatar);


// 删除用户接口 {id}
router.post('/deluser', auth, hadAdminPermission, deleteUser);

// 禁言某用户 {id}
router.post('/disableusercomment', auth, hadAdminPermission, disableusercomment);

// 获取用户详情接口 {id}
router.post('/getuserinfo', auth, hadAdminPermission, getUserInfo);

// 一次性获取用户列表接口
router.get('/getuserlist', auth, hadAdminPermission, getUserList);

// 分页获取用户列表接口
router.post('/getuserlist', auth, hadAdminPermission, getUserListByPage);

module.exports = router; 