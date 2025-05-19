const { Tag } = require("../db/models");

const validId = (req, res, next) => {
    
    const id = req.params.id

    if (id <= 0) {
        return res.status(400).json({message: "Bad request: el tag no puede tener id negativo"})
    }
    next();
};

const existsTag = async (req, res, next) => {
    
    const id = req.params.id;
    const data = await Tag.findByPk(id);

    if (!data) {
        return res.status(404).json({ message: `No existe el tag con id ${id}`})
    }
    next();
};


module.exports = { validId, existsTag}