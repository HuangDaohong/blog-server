const path = require('path');
const Koa = require('koa2');

const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');
const cors = require('koa2-cors');

const errHandler = require('./errHandler');


const router = require('../router');

const app = new Koa();

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
    },
    //默认情况下，koa-body是严格的，只解析POST、PUT和PATCH请求,对DELETE,HEAD,不生效的,要手动添加
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
//当前文件上一层的upload文件夹作为静态资源路径，访问：http://localhost:8000/0a0a6907d15073ff33c9a6900.jpg
app.use(KoaStatic(path.join(__dirname, '../upload')));
app.use(parameter(app));
app.use(cors());

app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理,捕捉error。(ctx.app.emit)任何报错都会收敛到此处，
app.on('error', errHandler);

module.exports = app;