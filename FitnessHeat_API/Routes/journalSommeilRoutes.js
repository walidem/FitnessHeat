const express = require('express');
const router = express.Router();
const journalSommeilController = require('../Controllers/journalSommeilController');

router.post('/', journalSommeilController.create);
router.get('/', journalSommeilController.getAll);
router.get('/user/:userId', journalSommeilController.getByUser);

module.exports = router;