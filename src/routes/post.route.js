const {Router} = require('express');
const router = Router();
const { postController } = require('../controllers');
const { postMiddleware } = require("../middlewares");

router.get('/', postController.getPosts);
router.get('/:id', postMiddleware.validId, postController.getPostById);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);

module.exports = router;
