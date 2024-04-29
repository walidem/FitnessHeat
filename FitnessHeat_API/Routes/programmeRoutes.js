const express = require('express');
const router = express.Router();
const programmeController = require('../Controllers/programmeController');

router.post('/', programmeController.create);
router.get('/', programmeController.getAll);
router.get('/:id', programmeController.getOne);
router.put('/:id', programmeController.update);
router.delete('/:id', programmeController.delete);

module.exports = router;