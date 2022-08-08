const Article = require('../model/article.model');
const Tag = require('../model/tag.model');
const Category = require('../model/category.model');
const Comment = require('../model/comment.model');
const Friend = require('../model/friend.model');
class ConfigService {
  // 获取网站数据：文章数量、分类数量、标签数量、评论数量、友链数量
  async getConfigCountData() {
    const articleCount = await Article.count({
      // where: {
      //   status: 0,
      // },
    });
    const categoryCount = await Category.count();
    const tagCount = await Tag.count();
    const commentCount = await Comment.count();
    const friendCount = await Friend.count();
    return {
      articleCount,
      categoryCount,
      tagCount,
      commentCount,
      friendCount,
    };
  }
}
module.exports = new ConfigService();
