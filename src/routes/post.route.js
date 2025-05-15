const {Router} = require('express');
const router = Router();
const { postController } = require('../controllers');
const { postMiddleware } = require("../middlewares");
const upload = require('../middlewares/uploadMiddleware'); // la que creaste

router.get('/', postController.getPosts);
router.get('/:id', postMiddleware.validId, postController.getPostById);
router.post('/',upload.array('images', 5), postController.createPost); // carga de imagenes
router.delete('/:id',postMiddleware.validId, postController.deletePost);
router.put('/:id',postMiddleware.validId, postController.updatePost);
router.get('/:id/comments', postController.getCommentsByPost);// chequear como mierda hacer nose.. by marce



module.exports = router;
