const {Router} = require('express');
const router = Router();
const {tagController} = require('../controllers');

router.get('/', tagController.getAll);
router.post('/', tagController.createTag);

module.exports = router;
