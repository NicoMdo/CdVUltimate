const { Tag } = require('../db/models');

const getAll = async (req, res) => {
  try {
    const tags = await Tag.findAll({});
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las etiquetas' });
  }
};

const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la etiqueta' });
  }
};


module.exports = { getAll, createTag };
