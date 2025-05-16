const {Router} = require('express');
const router = Router();
const { postController } = require('../controllers');
const { postMiddleware } = require("../middlewares");
const upload = require('../middlewares/uploadMiddleware'); // la que creaste

router.get('/', postController.getPosts);// trae todos los posts creados
router.get('/:id', postMiddleware.validId, postController.getPostById); //trae un post por su ID
router.get('/:id/tags', postMiddleware.validId, postController.getTagsByPost); //trae todos los tags asignados a un post


router.post('/',upload.array('images', 5), postController.createPost); //crea un post con o sin carga de imagenes
router.post('/:id/tags', postController.addTagsToPost); //asignar varios tags a un post

router.delete('/:id',postMiddleware.validId, postController.deletePost); // elimina un post por su ID

router.put('/:id',postMiddleware.validId, postController.updatePost); // actualiza un post 


//aun no anda
router.get('/:id/comments', postController.getCommentsByPost);// chequear como mierda hacer nose.. by marce



module.exports = router;
