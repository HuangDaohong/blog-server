const path = require('path');
const Koa = require('koa2');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');
const cors = require('koa2-cors');
const Koa_Logger = require('koa-logger'); //控制它请求日志
const Moment = require('moment');
const compress = require('koa-compress'); // 引入gzip压缩模块

const errHandler = require('./errHandler');
const router = require('../router');

const app = new Koa();

/**
 * node直接对源文件进行gzip压缩，虽然给客户端返回的是压缩后的资源，https://www.cnblogs.com/yalong/p/14948533.html
 * 但是如果压缩的文件比较大的话，压缩的这个过程耗时是比较久的，可能会导致用户体验还不如不开启gzip压缩好。
 */
app.use(
  compress({
    threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
  })
);

/**详细可看：http://wmm66.com/index/article/detail/id/172.html */
const logger = Koa_Logger((str) => {
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
});

// app.use(KoaBody());
app.use(
  KoaBody({
    // multipart: true,// 支持多文件上传
    // encoding: "gzip", // 编码格式
    // formidable: {
    //   uploadDir: path.join(__dirname, '../upload'),
    //   keepExtensions: true,//保持后缀名
    //   maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小限制
    // },
    //默认情况下，koa-body是严格的，只解析POST、PUT和PATCH请求,对DELETE,HEAD,不生效的,要手动添加
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

/**
 * 当前文件上一层的upload文件夹作为静态资源路径，
 * 访问：http://localhost:8000/0a0a6907d15073ff33c9a6900.jpg
 */
app.use(KoaStatic(path.join(__dirname, '../upload')));

app.use(parameter(app));
app.use(logger);
app.use(cors());

app.use(router.routes()).use(router.allowedMethods());

/** 统一的错误处理  */
app.on('error', errHandler);

module.exports = app;
