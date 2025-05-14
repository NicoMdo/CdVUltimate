const { User } = require('../db/models');


//Devuelve todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

//Devuelve un usuario por ID
const getUserById = async (req, res) => {
  const data = await User.findByPk(req.params.id);
  if (data)
    res.status(200).json(data);
  else
    res.status(404).json({ message: "Usuario no encontrado" });
};

//Crea un usuario
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

const deleteUser = async (req, res) => {
    try {
        const data = await User.findByPk(req.params.id);
        const removed = await data.destroy() 
        res.status(200).json({message: `El usuario con número de ID ${removed.id} se ha borrado correctamente`});
    } catch {
        res.status(404).json({ message: 'No se encuentra el usuario solicitado' });
    }
};



module.exports = { getUsers, getUserById, createUser, deleteUser};
