const User = require('../model/user.model');

class UserService {

  // 插入数据
  async createUser (user_name, password) {
    const res = await User.create(
      {
        // user_name: user_name,
        user_name,
        password
      }
    );
    // console.log(res)
    return res.dataValues;
  }

  // 查询数据
  async getUserInfo ({ id, user_name, password, is_admin }) {
    const whereOpt = {};

    // 把id放到whereOpt对象中
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],//选择某些字段
      where: whereOpt,
    });

    return res ? res.dataValues : null;
  }

  async updateById ({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};

    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    // console.log(newUser);
    // {
    //   password: '$2a$10$NbShDHuMYa1tf.WFpLgLOuT/2NPEJ6g8TLsIwj4UyGNsWM07NvvGW'
    // }
    const res = await User.update(newUser, { where: whereOpt });
    // console.log(res) //[ 1 ]
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
