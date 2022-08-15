const Comment = require('../model/comment.model');
const Article = require('../model/article.model');
const User = require('../model/user.model');
const { Op } = require('sequelize');

class CommentService {
  // 新增评论
  async createComment(comment) {
    // 文章评论数+1
    await Article.increment({ comments: 1 }, { where: { id: comment.article_id } });
    return await Comment.create(comment);
  }

  // 根据id获取评论
  async getOneComment(id) {
    return await Comment.findOne({
      where: { id },
    });
  }

  // 获取评论列表
  async getAllComment() {
    return await Comment.findAndCountAll();
  }

  // 根据文章id获取所有评论
  async getAllCommentByArticleId(articleId, pageNum, pageSize) {
    return await Comment.findAndCountAll({
      where: { article_id: articleId },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
    });
  }

  // 分页获取评论列表
  async getAllCommentByPage(pageNum, pageSize) {
    const { count, rows } = await Comment.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar', 'email', 'role', 'ip', 'address', 'client'],
        },
      ],
      distinct: true, //去重,它返回的 count 不会把你的 include 的数量算进去
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
    });
    return {
      total: count,
      list: rows,
      pageNum,
      pageSize,
    };
  }

  // 根据parend_comment_id字段分页获取包含children的评论列表,包含子组件评论
  async getAllCommentAndChildrenByPage(pageNum, pageSize) {
    console.log(pageNum, pageSize);
    const { count, rows } = await Comment.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar', 'email', 'ip', 'address', 'client'],
        },
      ],
      where: { parent_comment_id: null },
      distinct: true, //去重,它返回的 count 不会把你的 include 的数量算进去
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
    });

    // 获取子评论
    for (let i = 0; i < rows.length; i++) {
      const { id } = rows[i];
      const { count: childcount, rows: childRows } = await Comment.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'avatar', 'email', 'ip', 'address', 'client'],
          },
        ],
        where: { parent_comment_id: id },
        distinct: true,
        order: [['createdAt', 'ASC']],
      });

      if (childcount > 0) {
        for (let j = 0; j < childRows.length; j++) {
          if (childRows[j].reply_comment_id !== null) {
            const replyComment = await Comment.findOne({
              attributes: ['id', 'content'],
              where: { id: childRows[j].reply_comment_id },
              include: [
                {
                  model: User,
                  attributes: ['name', 'avatar'],
                },
              ],
            });
            childRows[j].dataValues.replyComment = replyComment;
          }
        }

        rows[i].dataValues.children = childRows;
      }
    }

    return {
      total: count,
      list: rows,
      pageNum,
      pageSize,
    };
  }

  // 批量删除评论
  async deleteManyComment(ids) {
    return await Comment.destroy({
      where: {
        id: { [Op.in]: ids },
        // id:ids // 或者也可以直接传数组
      },
    });
  }

  // 删除单个评论
  async deleteOneComment(id) {
    // 先删掉子评论
    await Comment.destroy({
      where: {
        parent_comment_id: id,
      },
    });
    const res = await Comment.destroy({
      where: { id },
    });
    return res > 0 ? true : false;
  }

  // 修改评论
  async updateComment(id, comment) {
    const res = await Comment.update(comment, {
      where: { id },
    });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new CommentService();
