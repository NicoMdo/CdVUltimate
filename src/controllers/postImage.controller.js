const { Post, PostImage } = require('../db/models');
const cache = require('../../utils/cache')

const getPostImages = async (req, res) => {
  try {
    const posts = await PostImage.findAll({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las imágenes' });
  }
};

const getPostImageById = async (req, res) => {
  try {
    const posts = await PostImage.findByPk(req.params.id);
    res.status(200).json(posts);
  } catch {
    res.status(500).json({ message: 'Error al obtener la imagen solicitada' });
  }
};

const createPostImage = async (req, res) => {
  try {
    const newPost = await PostImage.create(req.body);
    res.status(201).json(newPost);
    cache.del(`post_${newPost.postId}`);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

const deletePostImage = async (req, res) => {
  try {
    const data = await PostImage.findByPk(req.params.id);
    const postId = data.postId;
    const removed = await data.destroy()
    res.status(200).json({ message: `La imagen con número de ID ${removed.id} se ha borrado correctamente` });
    cache.del(`post_${postId}`);
  } catch {
    res.status(500).json({ message: 'No se encuentra la imagen solicitada' });
  }
};

const updatePostImage = async (req, res) => {
  try {
    const image = await PostImage.findByPk(req.params.id);
    const postId = image.postId;
  
    await image.update(req.body);
    cache.del(`post_${postId}`);
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la imagen del post' });
  }
};

const uploadImageForPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!req.file) {
      return res.status(400).json({ message: 'No se envió archivo' });
    }

    // Guardar registro de imagen
    const newImage = await PostImage.create({
      postId,
      url: `/images/${req.file.filename}`
    });

    res.status(201).json({ message: 'Imagen subida con éxito', image: newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};


module.exports = { getPostImages, getPostImageById, createPostImage, deletePostImage, updatePostImage, uploadImageForPost };