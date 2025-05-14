const { PostImage } = require('../db/models');

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
        res.status(404).json({ message: 'No se encuentra la imagen solicitada' });
    }
};

const createPostImage = async (req, res) => {
    try {
        const newPost = await PostImage.create(req.body);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el post' });
    }
};

const deletePostImage = async (req, res) => {
    try {
        const data = await PostImage.findByPk(req.params.id);
        const removed = await data.destroy() 
        res.status(200).json({message: `La imagen con número de ID ${removed.id} se ha borrado correctamente`});
    } catch {
        res.status(404).json({ message: 'No se encuentra la imagen solicitada' });
    }
};


module.exports = { getPostImages, getPostImageById, createPostImage, deletePostImage };
