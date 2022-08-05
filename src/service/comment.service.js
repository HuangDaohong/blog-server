const Comment = require('../model/comment.model');
const { Op } = require('sequelize');

class CommentService {
  // 新增评论
  async createComment(comment) {
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

  // 分页获取评论列表
  async getAllCommentByPage(pageNum, pageSize) {
    const { count, rows } = await Comment.findAndCountAll({
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
    });
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
    const res= await Comment.destroy({
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
