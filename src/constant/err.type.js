module.exports = {
  // 未知的错误
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: '未知错误',
    result: '',
  },
  // 数据格式错误
  PARAM_ERROR: {
    code: '20001',
    message: '数据格式错误',
    result: '',
  },

  userFormateError: {
    code: '10001',
    message: '用户名或密码或邮箱为空',
    result: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户或邮箱已经存在',
    result: '',
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    result: '',
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在',
    result: '',
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: '',
  },
  invalidPassword: {
    code: '10006',
    message: '密码不匹配',
    result: '',
  },
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    result: '',
  },
  invalidToken: {
    code: '10102',
    message: '无效的token',
    result: '',
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '没有管理员权限',
    result: '',
  },
  noToken: {
    code: '10104',
    message: '没有token',
    result: '',
  },
  fileUploadError: {
    code: '10201',
    message: '头像图片上传失败',
    result: '',
  },
  unSupportedFileType: {
    code: '10202',
    message: '不支持的文件格式',
    result: '',
  },

  tagAddError: {
    code: '10301',
    message: '添加标签失败',
    result: '',
  },
  tagGeterror: {
    code: '10302',
    message: '获取标签失败',
    result: '',
  },
  tagDelerror: {
    code: '10303',
    message: '删除标签失败',
    result: '',
  },
  tagUpdateError: {
    code: '10304',
    message: '修改标签失败',
    result: '',
  },
  invalidTagID: {
    code: '10305',
    message: '无效的标签ID',
    result: '',
  },
  tagIsExistedError: {
    code: '10306',
    message: '标签名已存在',
    result: '',
  },

  categoryAddError: {
    code: '10401',
    message: '添加分类失败',
    result: '',
  },
  categoryGeterror: {
    code: '10402',
    message: '获取分类失败',
    result: '',
  },
  categoryDelerror: {
    code: '10403',
    message: '删除分类失败',
    result: '',
  },
  categoryUpdateError: {
    code: '10404',
    message: '修改分类失败',
    result: '',
  },
  invalidCategoryID: {
    code: '10405',
    message: '无效的分类ID',
    result: '',
  },
  categoryIsExistedError: {
    code: '10406',
    message: '分类名已存在',
    result: '',
  },


};
