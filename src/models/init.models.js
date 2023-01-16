const Categories = require('./categories.model');
const Tasks = require('./tasks.model');
const Users = require('./users.model');
const TasksCategories = require('./tasks-categories.model')

const initModels = () => {

  Tasks.belongsTo(Users, {as: 'author', foreignKey: 'user_id'});
  Users.hasMany(Tasks, {as: 'task', foreignKey: 'user_id'});

  TasksCategories.belongsTo(Tasks, {as: 'task', foreignKey: 'task_id'});
  Tasks.hasMany(TasksCategories, {as: 'category', foreignKey: 'task_id'});

  TasksCategories.belongsTo(Categories, {as: 'category', foreignKey: 'category_id'});
  Categories.hasMany(TasksCategories, {as: 'task', foreignKey: 'category_id'});

};

module.exports = initModels;