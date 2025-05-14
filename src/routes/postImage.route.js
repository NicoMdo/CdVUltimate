const {Router} = require('express');
const router = Router();
const { postImageController } = require('../controllers');
const { postImageMiddleware } = require("../middlewares");

router.get('/', postImageController.getPostImages);
router.get('/:id', postImageMiddleware.validId, postImageController.getPostImageById);
router.post('/', postImageController.createPostImage);
router.delete('/:id', postImageMiddleware.validId, postImageController.deletePostImage);

module.exports = router;
