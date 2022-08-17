const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const WebLog = seq.define(
  'tb_weblog',
  {
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: DataTypes.NOW,
      comment: '日志时间',
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: '暂无描述',
      comment: '日志内容',
    },
    title: {
      type: DataTypes.STRING,
      comment: '日志标题',
    },
  },
  {
    freezeTableName: true,
  }
);
// WebLog.sync({ alter: true })
// WebLog.sync({ force: true })

module.exports = WebLog;
