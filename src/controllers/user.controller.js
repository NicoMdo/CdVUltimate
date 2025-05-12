const { User } = require('../db/models');


//Devuelve todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

//Crea un usuario
const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const newUser = await User.create({ userName, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
