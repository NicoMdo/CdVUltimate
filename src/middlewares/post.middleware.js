const { Post } = require("../db/models");

const validId = (req, res, next) => {
    
    const id = req.params.id

    if (id <= 0) {
        return res.status(400).json({message: "Bad request: el post no puede tener id negativo"})
    }
    next();
};

const existsPost = async (req, res, next) => {
    
    const id = req.params.id;
    const data = await Post.findByPk(id);

    if (!data) {
        return res.status(404).json({ message: `No existe el posteo con id ${id}`})
    }
    next();
};

module.exports = { validId, existsPost }