const {Router} = require('express');
const router = Router();
const { postController } = require('../controllers');
const { postMiddleware } = require("../middlewares");

router.get('/', postController.getPosts);
router.get('/:id', postMiddleware.validId, postController.getPostById);
router.post('/', postController.createPost);
router.delete('/:id',postMiddleware.validId, postController.deletePost);
router.put('/:id',postMiddleware.validId, postController.updatePost);
router.get('/:id/comments', postController.getCommentsByPost);



module.exports = router;
