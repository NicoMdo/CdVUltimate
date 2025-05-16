const { Post, PostImage, Comment, Tag } = require('../db/models');

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
        const postid = req.params.id;
        const postId = await Post.findOne({where: {id: postid}, include: ["comments", "images", "tags"]});
        res.status(200).json(postId.tags);
    } catch {
        res.status(404).json({ message: 'No se encuentra el posteo solicitado' });
    }
};

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);

        if (req.files) {
            const imagesToCreate = req.files.map(file => ({
                postId: newPost.id,
                url: `/images/${file.filename}` // guardamos la ruta relativa para poder servirla después
            }));

            await PostImage.bulkCreate(imagesToCreate);
        }

        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el post con imágenes' });
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
        const comments = await Comment.findAll({ where: { postId: postId}});
        // Trae los comentarios asociados

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios del post' });
    }
};

const addTagsToPost = async (req, res) => {
    try {
        const { tagIds } = req.body; // espera un array de IDs de tags


        // Verifica que los tags existan
        const tags = await Tag.findAll({ where: { id: tagIds } });
        if (tags.length !== tagIds.length) {
            return res.status(400).json({ message: 'Uno o más tags no existen' });
        }

        // Asocia los tags al post
        await post.addTags(tags);

        res.status(200).json({ message: 'Tags asignados correctamente al post' });
    } catch (err) {
        res.status(500).json({ error: 'Error al asignar los tags al post' });
    }
};

const getTagsByPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByPk(postId, {
            include: [{ model: Tag, as: 'tags', through: { attributes: [] } }]
        });

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.status(200).json(post.tags);
    } catch (error) {
        console.error("Error al obtener los tags:", error);
        res.status(500).json({ error: 'Error al obtener los tags del post' });
    }
};




module.exports = { getPosts, createPost, getPostById, deletePost, updatePost, getCommentsByPost, addTagsToPost, getTagsByPost };
