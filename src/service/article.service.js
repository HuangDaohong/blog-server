const Article = require('../model/article.model');
const ArticeTag = require('../model/article_tag.model');
const Tag = require('../model/tag.model');
const Category = require('../model/category.model');
const seq = require('../db/seq');
const { Op, QueryTypes } = require('sequelize');
class ArticleService {
  // 新增文章
  async createArticle(article) {
    return await Article.create(article);
  }

  // 添加文章id和标签id到文章标签表
  async createArticleTag({ article_id, tag_ids }) {
    const arr = tag_ids.map((tag_id) => ({ article_id, tag_id }));
    return await ArticeTag.bulkCreate(arr);
  }

  // 根据id删除文章
  async delArticleByID(articleID) {
    return await Article.destroy({ where: { article_id: articleID } });
  }

  // 获取全部文章
  async getAllArticle() {
    // 原始查询语句
    // return await seq.query(
    //   'SELECT a.*,c.name as category_name from tb_article as a LEFT JOIN tb_category as c ON a.category_id=c.id',
    //   { type: QueryTypes.SELECT }
    // );
    console.log('================获取全部文章');
    const res = await Article.findAndCountAll({
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name'],
        },
        {
          model: Tag,
          attributes: ['id', 'name'],
        },
      ],
      where: {
        status: {
          [Op.eq]: 0,
        },
      },
      order: [['createdAt', 'DESC']],
    });
    console.log('================获取全部文章成功');
    return res;
  }

  // 根据分类id获取文章
  async getAllArticleByCategor(categoryID) {
    return await Article.findAndCountAll({
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name', 'description'],
        },
      ],
      where: {
        category_id: categoryID,
        status: {
          [Op.eq]: 0,
        },
      },
      order: [['createdAt', 'DESC']],
    });
  }
}
module.exports = new ArticleService();
