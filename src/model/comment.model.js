const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const User = require('./user.model');
const Comment = seq.define(
  'tb_comment',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户id',
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '文章id',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '评论内容',
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '父评论id',
    },
    reply_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '回复评论id',
    },
    comment_equipment: {
      type: DataTypes.STRING(),
      allowNull: true,
      comment: '评论者的设备或者系统',
    },
  },
  {
    freezeTableName: true,
  }
);
//直接执行这个就行,联表,Comment.sync({ alter: true })
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
// Comment.sync({ alter: true })

module.exports = Comment;
