const express = require('express');
const router = express.Router();
const journalPoidsController = require('../Controllers/journalPoidsController');

router.post('/', journalPoidsController.create);
router.get('/', journalPoidsController.getAll);
router.get('/user/:userId', journalPoidsController.getByUser);

module.exports = router;