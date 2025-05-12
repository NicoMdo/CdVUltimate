const {Router} = require('express');
const router = Router();
const {postController} = require('../controllers');

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);

module.exports = router;
