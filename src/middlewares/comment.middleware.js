const { Comment } = require("../db/models");

const validId = (req, res, next) => {
    
    const id = req.params.id

    if (id <= 0) {
        return res.status(400).json({message: "Bad request: el comentario no puede tener id negativo"})
    }
    next();
};

const existsComment = async (req, res, next) => {
    
    const id = req.params.id;
    const data = await Comment.findByPk(id);

    if (!data) {
        return res.status(404).json({ message: `No existe el comentario con id ${id}`})
    }
    next();
};

module.exports = {validId, existsComment}