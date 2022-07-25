const Router = require('koa-router');

const {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} = require('../middleware/user.middleware');

// const { auth } = require('../middleware/auth.middleware');

const { register, login } = require('../controller/user.controller');

const router = new Router({ prefix: '/users' });

router.get('/', async (ctx) => {
  ctx.body = 'this is a users response!';
}
);

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register);

// 登录接口
router.post('/login', userValidator, verifyLogin, login);


module.exports = router; 