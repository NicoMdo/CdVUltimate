require('dotenv').config();
const { Comment } = require('../db/models');
const { Op } = require('sequelize');

// Obtener todos los comentarios visibles (menos de X meses de antigüedad)
const getComments = async (req, res) => {
  try {
    const monthsLimit = parseInt(process.env.COMMENT_VISIBLE_MONTHS || '5'); // default: 5 meses
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsLimit);

    const comments = await Comment.findAll({
      where: {
        createdAt: {
          [Op.gte]: cutoffDate
        }
      }
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};

// Crear nuevo comentario
const createComment = async (req, res) => {
  try {
    const { text, postId, userId } = req.body;

    const newComment = await Comment.create({
      text,
      postId,
      userId
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el comentario' });
  }
};

// Obtener un comentario por ID
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el comentario' });
  }
};

// Eliminar comentario
const deleteComment = async (req, res) => {
    try {
        const data = await Comment.findByPk(req.params.id);
        const removed = await data.destroy()
        res.status(200).json({ message:`El comentario con número de ID ${removed.id} se ha borrado correctamente` });
    } catch {
        res.status(500).json({ message: 'No se encuentra el comentario solicitado' });
    }
  };

// Actualizar comentario
const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findByPk(req.params.id);

    comment.text = text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el comentario' });
  }
};

module.exports = {
  getComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment
};
