const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Categories = require('./categories.model')
const Tasks = require('./tasks.model')


const TasksCategories = db.define("tasks_categories", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "category_id",
    references: {
      model: Categories,
      key: "id"
    }
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "task_id",
    references: {
      model: Tasks,
      key: "id"
    }
  },
}, {
  timestamps: false
});

module.exports = TasksCategories;