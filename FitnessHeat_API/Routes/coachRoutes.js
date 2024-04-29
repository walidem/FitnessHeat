// Routes/coachRoute.js

const express = require('express');
const router = express.Router();
const coachController = require('../Controllers/coachController'); 
const coachValidationSchema = require('../Shema/coachValidation'); 

// Helper function to validate schema
const validateCoach = (req, res, next) => {
    const { error } = coachValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

router.post('/', validateCoach, coachController.create);
router.post('/loginCoach', coachController.loginCoach);
router.get('/', coachController.getAll);
router.get('/:id', coachController.getOne);
router.put('/:id', validateCoach, coachController.update);
router.delete('/:id', coachController.delete);

module.exports = router;