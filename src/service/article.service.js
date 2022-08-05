const Article = require('../model/article.model');
const ArticeTag = require('../model/article_tag.model');
const ActicleCategory = require('../model/acticle_category.model');
const { Op } = require('sequelize');

class ArticleService {
  // 新增文章
  async createArticle(article) {
    return await Article.create(article);
  }

  // 添加文章id和标签id到文章标签表
  async createArticleTag({article_id, tag_ids }) {
    const arr = tag_ids.map((tag_id) => ({ article_id, tag_id }));
    return await ArticeTag.bulkCreate(arr);
  }

  // 添加文章id和分类id到文章分类表
  async createArticleCategory(obj) {
    return await ActicleCategory.create(obj);
  }


  // 根据id删除文章
  async delArticleByID(id) {
    return await Article.destroy({ where: { id } });
  }
}
module.exports = new ArticleService();
