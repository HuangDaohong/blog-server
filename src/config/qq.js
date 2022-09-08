async function QQgetAccessToken(code) {
  let result;
  let appId = '101972085';
  let appKey = 'd8ded098fdeceed4bf48658f7f5e8ed2';
  let redirectUrl = 'https://hdhblog.cn/api/users/qqlogin'; // 回调地址是一样的 我这里就是我的获取登陆接口的地址

  // 安装了 axios 请求 接口 获取返回的token
  await axios({
    url: `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${appId}&client_secret=${appKey}&code=${code}&redirect_uri=${redirectUrl}&fmt=json`,
    method: 'GET',
  })
    .then((res) => {
      console.log(res.data);
      result = res.data.access_token;
      //   res.data.access_token
    })
    .catch((err) => {
      console.log(err);
      result = err;
    });

  return result;
}

/**
 * 根据Token获取Openid
 * @param {string} accessToken token 令牌
 * @returns
 */
async function getOpenId(accessToken) {
  let result;

  // 跟上面差不多就不解释了
  await axios({
    url: `https://graph.qq.com/oauth2.0/me?access_token=${accessToken}&fmt=json`,
    method: 'GET',
  })
    .then((res) => {
      // 获取到了OpenID
      result = res.data.openid;
    })
    .catch((err) => {
      result = err;
    });

  return result;
}

/**
 * 根据Openid 和 Token 获取用户的信息
 * @param {string} accessToken
 * @param {string} openid
 * @returns
 */
async function QQgetUserInfo(token, openid) {
  let result;
  await axios({
    url: `https://graph.qq.com/user/get_user_info?access_token=${token}&oauth_consumer_key=101972085&openid=${openid}`,
    method: 'GET',
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
      result = err;
    });

  return result;
}

module.exports = {
  QQgetAccessToken,
  getOpenId,
  QQgetUserInfo,
};
