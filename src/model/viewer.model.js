const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Viewer = seq.define(
  'tb_viewer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '访问者ip',
    },
    city: {
      type: DataTypes.STRING,
      comment: '访问者所在城市',
    },
    counts: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '访问次数',
    },
  },
  {
    freezeTableName: true,
    comment: '访问者表',
  }
);
// node src/model/viewer.model.js
// Viewer.sync({ alter: true });
module.exports = Viewer;
