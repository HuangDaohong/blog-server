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
    message: '数据格式错误',
    data: '',
  },

  userFormateError: {
    code: '10001',
    message: '用户名或密码或邮箱为空',
    data: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户或邮箱已经存在',
    data: '',
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    data: '',
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在',
    data: '',
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    data: '',
  },
  invalidPassword: {
    code: '10006',
    message: '密码不匹配',
    data: '',
  },
  getUserInfoError: {
    code: '10007',
    message: '获取用户信息失败',
    data: '',
  },
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    data: '',
  },
  invalidToken: {
    code: '10102',
    message: '无效的token',
    data: '',
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '没有管理员权限',
    data: '',
  },
  noToken: {
    code: '10104',
    message: '没有token',
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
    message: '删除分类失败',
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

};
