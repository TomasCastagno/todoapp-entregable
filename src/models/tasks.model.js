const db = require('../utils/database');
const Users = require('./users.model')

const { DataTypes } = require('sequelize');

const Tasks = db.define("tasks", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_completed"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: Users,
      key: "id"
    }
  }
}, {
  timestamps: false
});

module.exports = Tasks;