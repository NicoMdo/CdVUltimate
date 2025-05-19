const { User } = require('../db/models');


//Devuelve todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({include: ["followed", "followers", "posts"]});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

//Devuelve un usuario por ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  const data = await User.findByPk(userId, {include: ["followed", "followers", "posts"]});
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

//Borra un usuario
const deleteUser = async (req, res) => {
    try {
        
        await User.destroy() 
        res.status(200).json({message: `El usuario con número de ID ${removed.id} se ha borrado correctamente`});
    } catch {
        res.status(404).json({ message: 'No se encuentra el usuario solicitado' });
    }
};

// Actualiza un usuario
const updateUser = async (req, res) => {
  try {

    const user = await User.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario' });
  }
};



module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser};
