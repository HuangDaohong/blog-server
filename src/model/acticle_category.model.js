/*
 * @Author: huang
 * @Date: 2022-07-25 20:21:14
 * @Description: 文章设置分类表
 */
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const ActicleCategory = seq.define('tb_acticle_category', {
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '文章id'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '分类id'
  }
},
  {
    freezeTableName: true, 
  }
);
// ActicleCategory.sync({ alter: true })

module.exports = ActicleCategory;