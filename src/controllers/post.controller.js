const { Post } = require('../db/models');

//Devuelve todos los posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
};

//Crea un Post
const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newPost = await Post.create({ title, content, userId });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el post' });
    }
};

module.exports = { getAllPosts, createPost };
