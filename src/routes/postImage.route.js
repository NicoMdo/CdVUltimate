const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const { postImageController } = require('../controllers');
const { postImageMiddleware } = require("../middlewares");

// Configuración multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

router.get('/', postImageController.getPostImages);
router.get('/:id', postImageMiddleware.validId, postImageMiddleware.existsPostImage, postImageController.getPostImageById);
router.post('/', postImageController.createPostImage);
router.delete('/:id', postImageMiddleware.validId, postImageMiddleware.existsPostImage, postImageController.deletePostImage);
router.put('/:id', postImageMiddleware.validId, postImageMiddleware.existsPostImage, postImageController.updatePostImage);
// Nueva ruta para subir imagen de un post
router.post('/upload/:postId', upload.single('image'), postImageController.uploadImageForPost);



module.exports = router;
