const db = require('../utils/database');
const Users = require('../models/users.model');
const Tasks = require('../models/tasks.model')


const users = [
  {username: 'Tomas', email: 'tomas@gmail.com', password: '1234'},
  {username: 'Pablo', email: 'pablo@gmail.com', password: '1234'},
  {username: 'Bianca', email: 'bianca@gmail.com', password: '1234'},
];

const tasks = [
  {title: "Tarea 1", description: "shalala1", userId: 1 },
  {title: "Tarea 2", description: "shalala2", userId: 1 },
  {title: "Tarea imposible", userId: 2 },
  {title: "Dormir zzzzz", description: "porque node no me deja", userId: 3 },
];

// const categories = [];

// const tasksCategories = [];

db.sync({force: true})
  .then(() => {
    console.log('Sembrado exitoso');
    users.forEach((user) => Users.create(user));

    setTimeout(() => {
      tasks.forEach((task) => Tasks.create(task))
    }, 100)
  })
  .catch((error) => console.log(error));

 

