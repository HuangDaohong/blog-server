/*
 * @Author: huang
 * @Date: 2022-07-25 20:23:34
 * @Description: 文章设置标签表
 */
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const ArticeTag = seq.define('tb_article_tag', {
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '文章id'
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '标签id'
  }
},
  {
    freezeTableName: true,
  }
);
ArticeTag.sync({ alter: true })

module.exports = ArticeTag;