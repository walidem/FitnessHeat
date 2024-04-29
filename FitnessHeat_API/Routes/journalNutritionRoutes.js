const express = require('express');
const router = express.Router();
const journalNutritionController = require('../Controllers/journalNutritionController');

router.post('/', journalNutritionController.create);
router.get('/', journalNutritionController.getAll);
router.get('/user/:userId', journalNutritionController.getByUser);

module.exports = router;