const express = require('express');
const router = express.Router();
const sommeilController = require('../controllers/sommeilController');

router.get('/', sommeilController.getAll);
router.get('/:id', sommeilController.getOne);
router.post('/', sommeilController.create);
router.put('/:id', sommeilController.update);
router.delete('/:id', sommeilController.delete);

module.exports = router;