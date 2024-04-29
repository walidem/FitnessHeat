const JournalSommeil = require('../Models/JournalSommeil'); 

const journalSommeilController = {
    async create(req, res) {
        try {
            const newEntry = await JournalSommeil.create(req.body);
            res.status(201).json(newEntry);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getAll(req, res) {
        try {
            const entries = await JournalSommeil.findAll();
            res.json(entries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getByUser(req, res) {
        try {
            const entries = await JournalSommeil.findAll({
                where: { ID_Utilisateur: req.params.userId }
            });
            res.json(entries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = journalSommeilController;
