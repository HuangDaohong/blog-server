const seq = require('../db/seq');
const Tag = require('./tag.model');
const Article = require('./article.model');
const ArticleTag=require('./article_tag.model');
Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: 'tag_id',
  otherKey: 'article_id',

});

Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: 'article_id',
  otherKey: 'tag_id',

});

// seq.sync({ alter: true });