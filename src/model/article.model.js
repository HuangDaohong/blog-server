const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Category = require('./category.model');
const Tag = require('./tag.model');
const ArticleTag = require('./article_tag.model');

const Article = seq.define(
  'tb_article',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    article_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      // primaryKey: true,
      comment: '文章id',
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '文章标题',
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '文章摘要',
    },
    content: {
      type: DataTypes.TEXT,
      comment: '文章内容',
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '文章封面地址',
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 0,
      comment: '文章状态, 0:发布, 1:草稿',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '文章作者id',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '文章分类id',
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '文章浏览量',
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '文章点赞量',
    },
  },
  {
    freezeTableName: true,
    paranoid: true, // 删除时不删除数据,而是把 deletedAt 字段设置为当前时间
  }
);
// 文章表和分类表的关系;Category 和 Article 是一对多的关系。因此，每个Category有多个Article，Article表中有一个categoryId列。
// Category.hasMany(Article, { foreignKey: 'categoryId' });

Article.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'categoryInfo',
});

Article.belongsToMany(Tag, {
  foreignKey: 'article_id',
  otherKey: 'tag_id',
  // constraints: false,//// 不生成外键
  through: {
    model: ArticleTag,
    // unique: false, // 不生成唯一索引
  },
});

Tag.belongsToMany(Article, {
  foreignKey: 'tag_id',
  otherKey: 'article_id',
  // constraints: false,
  through: {
    model: ArticleTag,
    // unique: false,
  },
});

// Article.sync({ alter: true })
// Article.sync({ force: true });

module.exports = Article;

/**
 * https://demopark.github.io/sequelize-docs-Zh-CN/core-concepts/assocs.html
 * A 称为 源 模型,而 B 称为 目标 模型.
 * A.hasOne(B) 关联意味着 A 和 B 之间存在一对一的关系,外键在目标模型(B)中定义.
 * A.belongsTo(B)关联意味着 A 和 B 之间存在一对一的关系,外键在源模型中定义(A).
 * A.hasMany(B) 关联意味着 A 和 B 之间存在一对多关系,外键在目标模型(B)中定义.
 * A.belongsToMany(B, { through: 'C' }) 关联意味着将表 C 用作联结表,在 A 和 B 之间存在多对多关系. 具有外键(例如,aId 和 bId). Sequelize 将自动创建此模型 C(除非已经存在),并在其上定义适当的外键.
 * Foo.belongsToMany(Bar, { through: 'foo_bar', sourceKey: 'name', targetKey: 'title' }); 这将创建带有字段 `fooName` 和 `barTitle` 的联结表 `foo_bar`.
 * A.belongsToMany(B) 包含一个额外的表(联结表),因此 sourceKey 和 targetKey 均可用,其中 sourceKey 对应于A(源)中的某个字段而 targetKey 对应于 B(目标)中的某个字段.
 * belongsToMany中，foreignKey 定义联结关系中源模型的 key,而 otherKey 定义目标模型中的 key
 */
/**
 * A 称为 源 模型,而 B 称为 目标 模型.
 * sourceKey:用作源表中关联键的字段的名称。默认为源表的主键
 * targetKey:要用作目标表中关联键的字段的名称。默认为目标表的主键
 * otherKey:联接表中外键的名称（表示目标模型）或表示另一列类型定义的对象的名称（有关语法，
 * 请参见“Sequelize.define”）。使用对象时，可以添加“name”属性来设置列的名称。默认为目标的名称+目标的主键
 * foreignKey:目标表中外键的名称，或表示外部列类型定义的对象的名称（有关语法，
 * 请参见'Sequelize.define'。使用对象时，可以添加“name”属性来设置列的名称。默认为源的名称+源的主键
 */
