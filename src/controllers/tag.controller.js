const { Tag } = require('../db/models');

const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({});
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las etiquetas' });
  }
};

const getTagById = async (req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id);
    res.status(200).json(tagId);
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

const deleteTag = async (req, res) => {
    try {
        const data = await Tag.findByPk(req.params.id);
        const removed = await data.destroy() 
        res.status(200).json({message: `El tag con número de ID ${removed.id} se ha borrado correctamente`});
    } catch {
        res.status(404).json({ message: 'No se encuentra el solicitado' });
    }
};



module.exports = { getTags, createTag, getTagById, deleteTag };
