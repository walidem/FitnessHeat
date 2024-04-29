const JournalPoids = require('../Models/JournalPoids');
const Utilisateur = require('../Models/Utilisateur');
const sequelize = require('../config/database');

const journalPoidsController = {
    async create(req, res) {
        const transaction = await sequelize.transaction();

        try {
            const newEntry = await JournalPoids.create(req.body, { transaction });

            // Mettre à jour le poids dans le profil de l'utilisateur
            await Utilisateur.update(
                { Poids: req.body.Poids },
                { where: { ID_Utilisateur: req.body.ID_Utilisateur }, transaction }
            );

            await transaction.commit();
            res.status(201).json(newEntry);
        } catch (error) {
            await transaction.rollback();
            res.status(500).send(error.message);
        }
    },

    async getAll(req, res) {
        try {
            const entries = await JournalPoids.findAll();
            res.json(entries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getByUser(req, res) {
        try {
            const entries = await JournalPoids.findAll({
                where: { ID_Utilisateur: req.params.userId }
            });
            res.json(entries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = journalPoidsController;
