const { Post, Comment } = require('../db/models');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
};
const getPostById = async (req, res) => {
    try {
        const postId = await Post.findByPk(req.params.id);
        res.status(200).json(postId);
    } catch {
        res.status(404).json({ message: 'No se encuentra el posteo solicitado' });
    }
};

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el post' });
    }
};

const deletePost = async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id);
        const removed = await data.destroy()
        res.status(200).json({ message: `El posteo con número de ID ${removed.id} se ha borrado correctamente` });
    } catch {
        res.status(404).json({ message: 'No se encuentra la imagen solicitada' });
    }
};

// Actualiza un post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        await post.update(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el post' });
    }
};

const getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Verifica si el post existe
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Trae los comentarios asociados
        const comments = await Comment.findAll({
            where: { postId }
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios del post' });
    }
};


module.exports = { getPosts, createPost, getPostById, deletePost, updatePost, getCommentsByPost };
