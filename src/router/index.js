const fs = require('fs');
const Router = require('koa-router');
const { isDev } = require('../config/config.default');

/* 生产环境下使用，因为nginx代理了api */
// const router = new Router();

/* 开发环境下使用 ,配置了.gitignore*/
const router = new Router({ prefix: isDev ? '/api' : '' });

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    let r = require('./' + file);
    router.use(r.routes());
  }
});

module.exports = router;
