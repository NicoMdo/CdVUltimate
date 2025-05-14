const validId = (req, res, next) => {
    
    const id = req.params.id

    if (id <= 0) {
        return res.status(400).json({message: "Bad request: la imagen no puede tener id negativo"})
    }
    next();
};

module.exports = { validId }