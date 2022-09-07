const path = require('path');
const Koa = require('koa2');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');
const cors = require('koa2-cors');
const Moment = require('moment');
const compress = require('koa-compress'); // 引入gzip压缩模块

const Koa_Session = require('koa-session');

const Koa_Logger = require('koa-logger'); //只能打印一些请求的信息，并不会记录日志
const errHandler = require('./errHandler');
const router = require('../router');
const app = new Koa();

/**
 * node直接对源文件进行gzip压缩，虽然给客户端返回的是压缩后的资源，https://www.cnblogs.com/yalong/p/14948533.html
 * 但是如果压缩的文件比较大的话，压缩的这个过程耗时是比较久的，可能会导致用户体验还不如不开启gzip压缩好。
 */
app.use(
  compress({
    threshold: 4096, // 阀值，当数据超过4kb的时候，可以压缩
  })
);

app.keys = ['some secret hurr']; //cookie的签名
app.use(
  Koa_Session(
    {
      key: 'koa:sess', //cookie key (default is koa:sess)
      maxAge: 1000 * 60 * 3, // cookie的过期时间 maxAge in ms 3分钟
      overwrite: true, //是否可以overwrite    (默认default true)
      httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
      signed: true, //签名默认true
      rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
      renew: false, //(boolean) renew session when session is nearly expired,
    },
    app
  )
);

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
app.use(KoaStatic(path.join(__dirname, '../upload/airticlecover')));
app.use(KoaStatic(path.join(__dirname, '../upload/articleimg')));

app.use(parameter(app));
app.use(
  Koa_Logger((str, args) => {
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
    // resLogger.info(str);
  })
);

app.use(
  cors({
    credentials: true, //允许跨域携带cookie
  })
);

app.use(router.routes()).use(router.allowedMethods());

/** 统一的错误处理  */
app.on('error', errHandler);

module.exports = app;
