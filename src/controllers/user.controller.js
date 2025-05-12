const { User } = require('../db/models');


//Devuelve todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
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
    res.status(404).json({message: "Usuario no encontrado"});
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
