const Friend = require('../model/friend.model');
class FriendService {
  // 插入数据
  async createFriend(friend) {
    return await Friend.create(friend);
  }

  // 查询所有数据
  async finAllFriends() {
    return await Friend.findAndCountAll();
  }

  // 删除数据
  async removeFriend(id) {
    const res = await Friend.destroy({
      where: { id },
    });
    return res > 0 ? true : false;
  }

  // 修改数据
  async updateFriendByID(id, friend) {
    console.log('===========', id, friend);
    const res = await Friend.update(friend, {
      where: { id: id },
    });
    return res[0];
  }
}

module.exports = new FriendService();
