const express = require('express');
const db = require("./utils/database")
const initModels = require('./models/init.models')
const Users = require('./models/users.model');
const Tasks = require('./models/tasks.model');


const app = express();

app.use(express.json())

const PORT = 8000;

db.authenticate()
  .then(() => console.log("Autenticación exitosa."))
  .catch((error) => console.log(error));

initModels();

db.sync({ alter: false })
  .then(() => console.log('Base de datos sincronizada.'))
  .catch((error) => console.log(error))

app.get('/', (req, res) => {
  res.status(200).json({ message: "Bienvenido al servidor" })
});


// obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await Users.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// obtener el usuario por ID
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});


//obtener usuario por username
app.get('/users/username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const result = await Users.findOne({ where: { username } });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//crear un nuevo usuario
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const result = await Users.create(user);
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});


// actualizar el password del usuario
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Users.update(field, {
      where: { id }
    });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// eliminar usuario (si el usuario tiene tareas asignadas, 
// no se puede borrar (por la llave foranea, primero hay que eliminar las tareas asignadas)
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.destroy({
      where: { id }
    });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});



// obtener todas las tareas

app.get('/tasks', async (req, res) => {
  try {
    const result = await Tasks.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


// obtener tareas por ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tasks.findByPk(id);
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});


// crear una nueva tarea
app.post('/tasks', async (req, res) => {
  try {
    const task = req.body;
    const result = await Tasks.create(task);
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});


// actualizar el status de la tarea (isCompleted)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Tasks.update(field, {
      where: { id }
    });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// borrar tarea
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tasks.destroy({
      where: { id }
    });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});