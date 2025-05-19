const { User } = require("../db/models")


const validId = (req, res, next) => {
    
    const id = req.params.id

    if (id <= 0) {
        return res.status(400).json({message: "Bad request: el usuario no puede tener id negativo"})
    }
    next();
};

const existsUser = async (req, res, next) => {
    
    const id = req.params.id;
    const data = await User.findByPk(id);

    if (!data) {
        return res.status(404).json({ message: `No existe el usuario con id ${id}`})
    }
    next();
};



module.exports = {validId, existsUser}