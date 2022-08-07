const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Tag = require('./tag.model');
const Article = require('./article.model');
const ArticleTag = seq.define(
  'tb_article_tag',
  {
    article_id: {
      // type: DataTypes.CHAR(36),
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '文章id',
      // references: {
      //   model: Article,
      //   key: 'id',
      // },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '标签id',
      // references: {
      //   model: Tag,
      //   key: 'id',
      // },
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Tag.belongsToMany(Article, {
//   through: ArticleTag,
//   foreignKey: 'tag_id',
//   otherKey: 'article_id',
//   // as: 'article_tag',
//   // onDelete: 'CASCADE',
//   // onUpdate: 'CASCADE'
// });

// Article.belongsToMany(Tag, {
//   through: ArticleTag,
//   foreignKey: 'article_id',
//   otherKey: 'tag_id',
//   // as: 'article_tag',
//   // onDelete: 'CASCADE',
//   // onUpdate: 'CASCADE'
// });

// ArticleTag.sync({ alter: true });
// ArticleTag.sync({ force: true })

module.exports = ArticleTag;
