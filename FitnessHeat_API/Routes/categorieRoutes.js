const express = require('express');
const router = express.Router();
const categorieController = require('../Controllers/categorieController');

router.post('/', categorieController.create);
router.get('/', categorieController.getAll);
router.get('/:id', categorieController.getOne);
router.put('/:id', categorieController.update);
router.delete('/:id', categorieController.delete);

module.exports = router;