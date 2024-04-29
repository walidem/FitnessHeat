// Validations/coachValidation.js

const Joi = require('joi');

// Define the validation schema
const coachSchema = Joi.object({
    ID_Coach: Joi.number().integer().min(1),
    Nom: Joi.string().max(50).required(),
    Prenom: Joi.string().max(50).required(),
    Email: Joi.string().email().max(150).required(),
    Matricule: Joi.string().max(50).required(),
    Mot_de_passe: Joi.string(),
    Telephone: Joi.string().max(20).allow('', null),
    Date_de_naissance: Joi.date().less('now').allow(null),
    Annee_experience: Joi.number().integer().min(0).allow(null),
    Specialisations: Joi.string().max(1000).allow('', null)
});

module.exports = coachSchema;