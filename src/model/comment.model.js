const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Comment = seq.define('tb_comment', {

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '文章id'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '评论内容'
  },
  parent_comment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '父评论id'
  },
  comment_equipment:{
    type: DataTypes.STRING(),
    allowNull: true,
    comment: '评论者的设备或者系统'
  }
},
  {
    freezeTableName: true,
  }
);
Comment.sync({ alter: true })


module.exports = Comment;