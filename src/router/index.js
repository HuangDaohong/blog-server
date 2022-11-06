const fs = require('fs'); // nodejs的文件系统模块
const Router = require('koa-router'); // koa 路由中间件

/* 生产环境下使用，因为nginx代理了api */
// const router = new Router();

/* 开发环境下使用 ,配置了.gitignore*/
const router = new Router({ prefix: '/api' });

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    let r = require('./' + file);
    router.use(r.routes());
  }
});

module.exports = router;
