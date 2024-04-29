const Joi = require('joi');

// Validation pour la création ou la mise à jour d'un utilisateur
const utilisateurSchema = Joi.object({
    ID_Utilisateur: Joi.number().integer(),
    Nom: Joi.string().max(50).required(),
    Prenom: Joi.string().max(50).required(),
    Mot_de_passe: Joi.string().min(6).max(100),
    NomUtilisateur: Joi.string().max(50).required(),
    Email: Joi.string().email().max(150).required(),
    Telephone: Joi.string().max(20).allow('', null),
    Date_de_naissance: Joi.date().less('now').allow(null),
    Sexe: Joi.string().max(10).valid('M', 'F', 'Other').insensitive().allow('', null),
    Taille: Joi.number().precision(2).min(0).allow(null),
    Poids: Joi.number().precision(2).min(0).allow(null),
    Objectif: Joi.string().allow('', null)
}).options({ abortEarly: false });

// Validation spécifique pour la connexion
const loginSchema = Joi.object({
    NomUtilisateur: Joi.string().required(),
    Mot_de_passe: Joi.string().required()
}).options({ abortEarly: false });

// Validation pour la mise à jour d'un utilisateur
const updateUserSchema = Joi.object({
    Nom: Joi.string().max(50),
    Prenom: Joi.string().max(50),
    Mot_de_passe: Joi.string().min(6).max(100),
    NomUtilisateur: Joi.string().max(50),
    Email: Joi.string().email().max(150),
    Telephone: Joi.string().max(20).allow('', null),
    Date_de_naissance: Joi.date().less('now').allow(null),
    Sexe: Joi.string().max(10).valid('M', 'F', 'Other').insensitive().allow('', null),
    Taille: Joi.number().precision(2).min(0).allow(null),
    Poids: Joi.number().precision(2).min(0).allow(null),
    Objectif: Joi.string().allow('', null)
}).options({ abortEarly: false });

module.exports = { utilisateurSchema, loginSchema, updateUserSchema };