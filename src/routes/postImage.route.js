const {Router} = require('express');
const router = Router();
const { postImageController } = require('../controllers');

router.get('/', postImageController.getPostImages);
router.post('/', postImageController.createPostImage);

module.exports = router;
