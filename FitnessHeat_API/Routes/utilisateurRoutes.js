const express = require('express');
const router = express.Router();
const utilisateurController = require('../Controllers/utilisateurController');
const { utilisateurSchema, loginSchema, updateUserSchema } = require('../Shema/utilisateurValidation');
const validate = require('../Middlewares/validateRequest');

// Middleware for general user validation
const validateUtilisateur = (req, res, next) => {
    const { error } = utilisateurSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

// Middleware for login validation
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

// Routes with user validation
router.post('/', validateUtilisateur, utilisateurController.create);

// Route de mise à jour
router.put('/:id', validate(updateUserSchema), utilisateurController.update);

// Login route with login validation
router.post('/loginUtilisateur', validateLogin, utilisateurController.loginUtilisateur);

// Other routes
router.get('/', utilisateurController.getAll);
router.get('/:id', utilisateurController.getOne);
router.delete('/:id', utilisateurController.delete);

module.exports = router;