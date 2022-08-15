module.exports = {
  // 未知的错误
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: '未知错误',
    data: '',
  },
  // 数据格式错误
  PARAM_ERROR: {
    code: '20001',
    message: '传入数据格式错误😅',
    data: '',
  },

  userFormateError: {
    code: '10001',
    message: '用户名或密码或邮箱为空😅',
    data: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户或邮箱已经存在😅',
    data: '',
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误😅',
    data: '',
  },
  userDoesNotExist: {
    code: '10004',
    message: '非法用户😅',
    data: '',
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败😅',
    data: '',
  },
  invalidPassword: {
    code: '10006',
    message: '密码不匹配💢',
    data: '',
  },
  getUserInfoError: {
    code: '10007',
    message: '获取用户信息失败',
    data: '',
  },
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期💢',
    data: '',
  },
  invalidToken: {
    code: '10102',
    message: '无效的token😅',
    data: '',
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '你不是管理员😅😅😅',
    data: '',
  },
  noToken: {
    code: '10104',
    message: '没有token',
    data: '',
  },
  userUpdateError:{
    code: '10105',
    message: '用户更新失败',
    data: '',
  },
  invalidOldPassword:{
    code: '10106',
    message: '旧密码不正确',
    data: '',
  },
  fileUploadError: {
    code: '10201',
    message: '头像图片上传失败',
    data: '',
  },
  unSupportedFileType: {
    code: '10202',
    message: '不支持的文件格式',
    data: '',
  },

  tagAddError: {
    code: '10301',
    message: '添加标签失败',
    data: '',
  },
  tagGeterror: {
    code: '10302',
    message: '获取标签失败',
    data: '',
  },
  tagDelerror: {
    code: '10303',
    message: '删除标签失败',
    data: '',
  },
  tagUpdateError: {
    code: '10304',
    message: '修改标签失败',
    data: '',
  },
  invalidTagID: {
    code: '10305',
    message: '无效的标签ID',
    data: '',
  },
  tagIsExistedError: {
    code: '10306',
    message: '标签名已存在',
    data: '',
  },

  categoryAddError: {
    code: '10401',
    message: '添加分类失败',
    data: '',
  },
  categoryGeterror: {
    code: '10402',
    message: '获取分类失败',
    data: '',
  },
  categoryDelerror: {
    code: '10403',
    message: '删除分类失败,可能存在关联文章 😅',
    data: '',
  },
  categoryUpdateError: {
    code: '10404',
    message: '修改分类失败',
    data: '',
  },
  invalidCategoryID: {
    code: '10405',
    message: '无效的分类ID',
    data: '',
  },
  categoryIsExistedError: {
    code: '10406',
    message: '分类名已存在',
    data: '',
  },

  // 评论相关
  commentAddError: {
    code: '10501',
    message: '添加评论失败',
    data: '',
  },
  commentGetError: {
    code: '10502',
    message: '获取评论失败',
    data: '',
  },
  commentDelError: {
    code: '10503',
    message: '删除评论失败',
    data: '',
  },
  commentUpdateError: {
    code: '10504',
    message: '修改评论失败',
    data: '',
  },
  invalidCommentID: {
    code: '10505',
    message: '无效的评论ID',
    data: '',
  },

  // 文章相关
  articleIsExistedError: {
    code: '10601',
    message: '文章已存在',
    data: '',
  },
  articleAddError: {
    code: '10602',
    message: '添加文章失败',
    data: '',
  },
  articleGetError: {
    code: '10603',
    message: '获取文章失败',
    data: '',
  },
  articleNotFoundError: {
    code: '10604',
    message: '文章不存在',
    data: '',
  },
  articleDelError: {
    code: '10605',
    message: '删除文章失败',
    data: '',
  },
  articleUpdateError: {
    code: '10606',
    message: '修改文章失败',
    data: '',
  },
  articleTitleExistedError: {
    code: '10607',
    message: '文章标题已存在',
    data: '',
  },

  // 网站相关
  configDataGetError: {
    code: '10701',
    message: '获取网站数据失败',
    data: '',
  },

  // 友链相关
  friendAddError: {
    code: '10801',
    message: '添加友链失败',
    data: '',
  },
  friendGeterror: {
    code: '10802',
    message: '获取友链失败',
    data: '',
  },
  friendDelerror: {
    code: '10803',
    message: '删除友链失败',
    data: '',
  },
  friendUpdateError: {
    code: '10804',
    message: '修改友链失败',
    data: '',
  },
};
