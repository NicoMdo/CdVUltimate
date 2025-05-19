const {Router} = require('express');
const router = Router();
const { commentController } = require('../controllers');
const { commentMiddleware } = require("../middlewares");


router.get('/',commentController.getComments);
router.get('/:id',commentMiddleware.validId, commentMiddleware.existsComment, commentController.getCommentById);
router.post('/', commentController.createComment);
router.put('/:id',commentMiddleware.validId, commentMiddleware.existsComment, commentController.updateComment);
router.delete('/:id',commentMiddleware.validId, commentMiddleware.existsComment, commentController.deleteComment);



module.exports = router;
