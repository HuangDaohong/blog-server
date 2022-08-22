const Article = require('../model/article.model');
const ArticeTag = require('../model/article_tag.model');
const Tag = require('../model/tag.model');
const Category = require('../model/category.model');
const seq = require('../db/seq');
const { Op, QueryTypes } = require('sequelize');
class ArticleService {
  // 新增文章
  async createArticle(article) {
    console.log('新增文章', '--------------');
    return await Article.create(article);
  }

  // 添加文章id和标签id到文章标签表
  async createArticleTag({ article_id, tag_ids }) {
    // 先删除原有的标签
    await ArticeTag.destroy({ where: { article_id } });
    const arr = tag_ids.map((tag_id) => ({ article_id, tag_id }));
    return await ArticeTag.bulkCreate(arr);
  }

  // 根据id删除文章
  async delArticleByID(articleID) {
    return await Article.destroy({ where: { id: articleID } });
  }

  // 获取全部文章
  async getAllArticle() {
    // 原始查询语句
    // return await seq.query(
    //   'SELECT a.*,c.name as category_name from tb_article as a LEFT JOIN tb_category as c ON a.category_id=c.id',
    //   { type: QueryTypes.SELECT }
    // );
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
          through: { attributes: [] }, //就不查tb_article_tag了
        },
      ],
      where: {
        status: {
          [Op.eq]: 0,
        },
      },
      distinct: true, //去重,它返回的 count 不会把你的 include 的数量算进去
      order: [['createdAt', 'DESC']],
    });
    return res;
  }

  /**分页获取文章 */
  async getAllArticleByPage(pageNum, pageSize, status, origin, weight, keyword, datefrom, dateto) {
    let datewhere = null;
    if (datefrom !== null && dateto !== null) {
      datewhere = {
        createdAt: {
          [Op.between]: [datefrom, dateto],
        },
      };
      // datewhere = {
      //   createdAt: {
      //     [Op.lt]: dateto,
      //     [Op.gt]: datefrom,
      //   },
      // };
    }
    const { count, rows } = await Article.findAndCountAll({
      attributes: { exclude: ['content'] }, //不包括deletedAt字段
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name', 'background'],
        },
        {
          model: Tag,
          attributes: ['id', 'name', 'color', 'background'],
          through: { attributes: [] },
        },
      ],
      where: {
        status: {
          [Op.in]: status ? [status] : [0, 1],
        },
        origin: {
          [Op.in]: origin ? [origin] : [0, 1, 2],
        },
        weight: {
          [Op.in]: weight ? [weight] : [0, 1, 2],
        },
        createdAt: {
          [Op.between]: [datefrom, dateto],
        },
        [Op.or]: [
          { title: keyword ? { [Op.like]: `%${keyword}%` } : { [Op.ne]: null } },
          { subtitle: keyword ? { [Op.like]: `%${keyword}%` } : { [Op.ne]: null } },
          // { createdAt: datefrom && dateto ? { [Op.between]: [datefrom, dateto] } : { [Op.ne]: null }},
        ],
      },
      distinct: true, //去重,它返回的 count 不会把你的 include 的数量算进去
      order: [['createdAt', 'DESC']],
      limit: pageSize * 1,
      offset: (pageNum - 1) * pageSize,
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  /** web  分页获取文章 */
  async getAllArticleByPage2(pageNum, pageSize, weight, keyword) {
    const { count, rows } = await Article.findAndCountAll({
      attributes: { exclude: ['content', 'id'] }, //不包括deletedAt字段
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name', 'background'],
        },
        {
          model: Tag,
          attributes: ['id', 'name', 'color', 'background'],
          through: { attributes: [] },
        },
      ],
      where: {
        status: 0,
        weight: {
          [Op.in]: weight ? [weight] : [0, 1, 2],
        },
        [Op.or]: [
          { title: keyword ? { [Op.like]: `%${keyword}%` } : { [Op.ne]: null } },
          { subtitle: keyword ? { [Op.like]: `%${keyword}%` } : { [Op.ne]: null } },
        ],
      },
      distinct: true, //去重,它返回的 count 不会把你的 include 的数量算进去
      order: [['createdAt', 'DESC']],
      limit: pageSize * 1,
      offset: (pageNum - 1) * pageSize,
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  /* web 随机获取推荐文章 */
  async getRecommendByPage(counts) {
    const { count, rows } = await Article.findAndCountAll({
      attributes: { exclude: ['content', 'id'] }, //不包括deletedAt字段
      where: {
        status: 0,
        weight: 2,
      },
      // 随机获取
      // order: [[seq.fn('RAND')]],
      order: seq.random(),
      limit: counts * 1,
    });
    return {
      total: count,
      list: rows,
    };
  }

  // 根据文章id获取文章,文章访问量+1
  async getArticleByID(articleID) {
    const res = await Article.findOne({
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name'],
        },
        {
          model: Tag,
          attributes: ['id', 'name', 'color'],
          through: { attributes: [] },
        },
      ],
      where: {
        id: articleID,
        // status: {
        //   [Op.eq]: 0,
        // },
      },
    });
    if (res) {
      await res.increment('views', { by: 1 });
    } else {
      return false;
    }
    return res.reload();
  }

  // 根据article_id获取文章,文章访问量+1
  async getArticleByArticleID(articleID) {
    // console.log('articleID:@@@@@@@@', articleID);
    const res = await Article.findOne({
      exclude: ['id', 'createdAt', 'status'],
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name'],
        },
        {
          model: Tag,
          attributes: ['id', 'name', 'color'],
          through: { attributes: [] },
        },
      ],
      where: {
        article_id: articleID,
      },
    });
    if (res) {
      await res.increment('views', { by: 1 });
    } else {
      return false;
    }
    return res.reload();
  }

  // 根据分类id获取文章
  async getAllArticleByCategor(categoryID) {
    return await Article.findAndCountAll({
      attributes: { exclude: ['deletedAt'] }, //不包括deletedAt字段
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: Tag,
          attributes: ['id', 'name', 'color'],
          through: { attributes: [] },
        },
      ],
      where: {
        category_id: categoryID,
        status: {
          [Op.eq]: 0,
        },
      },
      distinct: true,
      order: [['createdAt', 'DESC']],
    });
  }

  // 根据标签id获取文章
  async getAllArticleByTag(tagID) {
    const { rows, count } = await Tag.findAndCountAll({
      attributes: ['name'],
      include: [
        {
          model: Article,
        },
      ],
      where: {
        id: tagID,
      },
    });
    const articles = rows[0].tb_articles;
    return { count, articles };
  }

  // 根据关键字获取文章列表
  async getAllArticleByKeyword(keyword, pageNum, pageSize) {
    let keywordWhere = null;
    if (keyword) {
      if (keyword.length > 10) {
        keyword = keyword.substring(0, 10);
      }
      keywordWhere = {
        title: {
          [Op.like]: `%${keyword}%`,
        },
        subtitle: {
          [Op.like]: `%${keyword}%`,
        },
        content: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }

    const { count, rows } = await Article.findAndCountAll({
      include: [
        {
          model: Category,
          as: 'categoryInfo',
          attributes: ['id', 'name'],
        },
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
      where: {
        [Op.or]: keywordWhere,
        status: 0,
      },
      distinct: true,
      // order: [['createdAt', 'DESC']],
      limit: pageSize * 1,
      offset: (pageNum - 1) * pageSize,
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  // 批量删除文章
  async delArticleByIDs(articleIDs) {
    return await Article.destroy({ where: { id: articleIDs } });
  }

  // 更新文章
  async updateArticleByID(articleID, articleInfo) {
    const { title } = articleInfo;
    if (title) {
      const isExist = await Article.findOne({
        where: {
          title: title,
          id: {
            [Op.ne]: articleID,
          },
        },
      });
      if (isExist) {
        return false;
      }
    }
    return await Article.update(articleInfo, { where: { id: articleID } });
  }

  // 增加文章访问量
  async increaseViewsById(articleID) {
    return await Article.increment('views', { by: 1, where: { id: articleID } });
  }

  // 文章点赞加1
  async increaseLikesById(articleID) {
    return await Article.increment('likes', { by: 1, where: { id: articleID } });
  }
}
module.exports = new ArticleService();
