const { User } = require('../db/models');


//Devuelve todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: ["followed", "followers", "posts"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error al obtener usuarios' });
  }
};

//Devuelve un usuario por ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.findByPk(userId, {
      include: ["followed", "followers", "posts"]
    });

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el usuario solicitado" });
  }
};



//Crea un usuario
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error al crear el usuario' });
  }
};

//Borra un usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });

    res.status(200).json({ message: `El usuario con número de ID ${id} se ha borrado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'No se puede borrar el usuario solicitado' });
  }
};

// Actualiza un usuario

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.update(req.body, { where: { id } });

    res.status(200).json({ message: `El usuario con número de ID ${id} se ha actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'El error al actualizar el usuario' });
  }
};



module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser };