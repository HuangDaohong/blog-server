const Article = require('../model/article.model');
const KoaBody = require('koa-body');
const path = require('path');

const { articleIsExistedError } = require('../constant/err.type');

const verifyIsExisted = async (ctx, next) => {
  // 文章名是否已经存在
  const { title } = ctx.request.body;
  const article = await Article.findOne({ where: { title } });
  if (article) {
    return ctx.app.emit('error', articleIsExistedError, ctx);
  }
  return await next();
};

const koabodysettings = KoaBody({
  multipart: true, // 支持文件上传
  encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, '../upload/airticlecover'),
    keepExtensions: true, //保持后缀名
    multipart: false, //不支持多文件
    maxFieldsSize: 200 * 1024 * 1024, // 文件上传大小限制
    // onFileBegin: (name, file) => { //文件上传前的一些设置操作
    // file.filepath = path.join(__dirname, '../upload/' + '11.jpg');
    // }

    // 禁止上传非图片文件,曲线救国，把非图片文件都重新替换成 errorHandler.jpg
    // 头像上传成功 errorHandler.jpg就会消失
    onFileBegin: (name, file) => {
      const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/bmp', 'image/webp'];
      if (!fileTypes.includes(file.mimetype)) {
        file.filepath = path.join(__dirname, '../upload/airticlecover/' + 'errorHandler.jpg');
      }
    },
  },
});
const koabodyImgsettings = KoaBody({
  multipart: true, // 支持文件上传
  encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, '../upload/articleimg'),
    keepExtensions: true, //保持后缀名
    multipart: false, //不支持多文件
    maxFieldsSize: 200 * 1024 * 1024, // 文件上传大小限制
    // onFileBegin: (name, file) => { //文件上传前的一些设置操作
    // file.filepath = path.join(__dirname, '../upload/' + '11.jpg');
    // }

    // 禁止上传非图片文件,曲线救国，把非图片文件都重新替换成 errorHandler.jpg
    // 头像上传成功 errorHandler.jpg就会消失
    // onFileBegin: (name, file) => {
    //   if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    //     file.filepath = path.join(__dirname, '../upload/airticlecover/' + 'errorHandler.jpg');
    //   }
    // }
  },
});
module.exports = {
  verifyIsExisted,
  koabodysettings,
  koabodyImgsettings,
};
