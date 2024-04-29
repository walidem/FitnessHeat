const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

router.get('/', nutritionController.getAll);
router.get('/:id', nutritionController.getOne);
router.post('/', nutritionController.create);
router.put('/:id', nutritionController.update);
router.delete('/:id', nutritionController.delete);

module.exports = router;