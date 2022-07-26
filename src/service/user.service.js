const { Op } = require("sequelize");
const User = require('../model/user.model');
const seq = require('../db/seq');
class UserService {

  // 插入数据
  async createUser (name, password, email) {
    console.log({
      name,
      password,
      email
    });
    const res = await User.create(
      {
        name,
        password,
        email
      }
    );
    return res.dataValues;
  }

  // 查询数据
  async getUserInfo ({ id, name, email }) {
    const whereOpt = [];
    id && whereOpt.push({ id });
    name && whereOpt.push({ name });
    email && whereOpt.push({ email });
    const res = await User.findOne({
      attributes: ['id', 'name', 'email', 'password', 'avatar', 'createdAt', 'updatedAt', 'role', 'ip', 'disabledDiscuss'],
      where: {
        [Op.or]: whereOpt
      },
    });
    return res ? res.dataValues : null;
  }


  // 修改数据
  async updateById ({ id, name, password, email, avatar, disabledDiscuss }) {
    const whereOpt = { id };
    const newUser = {};

    name && Object.assign(newUser, { name });
    password && Object.assign(newUser, { password });
    email && Object.assign(newUser, { email });
    avatar && Object.assign(newUser, { avatar });
    disabledDiscuss && Object.assign(newUser, { disabledDiscuss });

    const res = await User.update(newUser, { where: whereOpt });
    // console.log(res) //[ 1 ]
    return res[0] > 0 ? true : false;
  }

  // 删除数据
  async deleteById ({ id }) {
    const res = await User.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  // 获取用户列表
  async getUserList () {
    const res = await User.findAndCountAll({
      attributes: ['id', 'name', 'email', 'avatar', 'createdAt', 'updatedAt', 'role', 'ip', 'disabledDiscuss'],
    });
    return res;
  }

  // 获取用户列表 分页
  async getUserListPage ({ pageNum, pageSize }) {
    const res = await User.findAndCountAll({
      attributes: ['id', 'name', 'email', 'avatar', 'createdAt', 'updatedAt', 'role', 'ip', 'disabledDiscuss'],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize*1,
    });
    return res;
  }


}

module.exports = new UserService();
