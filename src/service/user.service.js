const { Op } = require('sequelize');
const User = require('../model/user.model');
// const seq = require('../db/seq');
class UserService {
  // 插入数据
  async createUser(user) {
    return await User.create(user);
  }

  // 查询数据
  async getUserInfo({ id, name, email }) {
    const res = await User.findOne({
      // 根据name或者email查询，不包括此id
      where: {
        [Op.or]: [{ name }, { email }],
        id: {
          [Op.ne]: id,
        },
      },
    });
    return res;
  }
  y;
  async getUserInfoByName({ name }) {
    const res = await User.findOne({
      where: {
        name,
      },
    });
    return res;
  }

  // 通过id查询数据
  async getUserInfoByID({ id }) {
    const res = await User.findOne({
      where: {
        id,
      },
    });
    return res ? res.dataValues : null;
  }

  // username或者email查询用户
  async getLoginUserInfo({ name }) {
    const res = await User.findOne({
      where: {
        [Op.or]: [{ name }, { email: name }],
        disabledDiscuss: {
          [Op.eq]: 0,
        },
      },
    });
    return res ? res.dataValues : null;
  }

  async getLoginUserInfo2({ name, email }) {
    const whereOpt = [];
    name && whereOpt.push({ name });
    email && whereOpt.push({ email });
    const res = await User.findOne({
      where: {
        [Op.or]: whereOpt,
        disabledDiscuss: {
          [Op.eq]: 0,
        },
      },
    });
    return res ? res.dataValues : null;
  }

  // 修改数据
  async updateById(id, user) {
    // const whereOpt = { id };
    // const newUser = {};
    // name && Object.assign(newUser, { name });
    // password && Object.assign(newUser, { password });
    // email && Object.assign(newUser, { email });
    // avatar && Object.assign(newUser, { avatar });
    // disabledDiscuss && Object.assign(newUser, { disabledDiscuss });
    // role && Object.assign(newUser, { role });

    const res = await User.update(user, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  // 删除数据
  async deleteById({ id }) {
    const res = await User.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  // 获取用户列表
  async getUserList() {
    const res = await User.findAndCountAll({
      attributes: ['id', 'name', 'email', 'avatar', 'createdAt', 'updatedAt', 'role', 'ip', 'disabledDiscuss'],
    });
    return res;
  }

  // 获取用户列表 分页
  async getUserListPage({ pageNum, pageSize }) {
    const { count, rows } = await User.findAndCountAll({
      attributes: ['id', 'name', 'email', 'avatar', 'createdAt', 'updatedAt', 'role', 'ip', 'disabledDiscuss'],
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
}

module.exports = new UserService();
