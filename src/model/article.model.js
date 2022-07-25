const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Article = seq.define('tb_article', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '文章标题'
  },
  subtitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '文章摘要'
  },
  content: {
    type: DataTypes.TEXT,
    comment: '文章内容'
  },
  cover: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '文章封面地址'
  },
  status: {
    type: DataTypes.CHAR(1),
    allowNull: true,
    defaultValue: 0,
    comment: '文章状态, 0:发布, 1:草稿'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '文章作者id'
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '文章浏览量'
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '文章点赞数'
  }
},
  {
    freezeTableName: true,
  }
);
Article.sync({ alter: true })

module.exports = Article;