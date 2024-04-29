const JournalNutrition = require('../Models/JournalNutrition');

const journalNutritionController = {
    async create(req, res) {
        try {
            const newEntry = await JournalNutrition.create(req.body);
            res.status(201).json(newEntry);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getAll(req, res) {
        try {
            const entries = await JournalNutrition.findAll();
            res.json(entries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getByUser(req, res) {
        try {
            const entries = await JournalNutrition.findAll({
                where: { ID_Utilisateur: req.params.userId }
            });
            res.json(entries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = journalNutritionController;
