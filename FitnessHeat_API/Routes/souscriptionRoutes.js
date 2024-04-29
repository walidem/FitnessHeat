const express = require('express');
const router = express.Router();
const souscriptionController = require('../Controllers/souscriptionController');

router.post('/', souscriptionController.create);
router.get('/', souscriptionController.getAll);
router.get('/:id', souscriptionController.getOne);
router.put('/:id', souscriptionController.update);
router.delete('/:id', souscriptionController.delete);

module.exports = router;