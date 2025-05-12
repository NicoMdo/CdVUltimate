const { PostImage } = require('../db/models');

const getPostImages = async (req, res) => {
    try {
        const posts = await PostImage.findAll({});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las imágenes' });
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

module.exports = { getPostImages, createPostImage };
