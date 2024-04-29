const Souscription = require('../Models/Souscription'); 

const souscriptionController = {
    // Create a new subscription
    async create(req, res) {
        try {
            const newSouscription = await Souscription.create(req.body);
            res.status(201).json(newSouscription);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get all subscriptions
    async getAll(req, res) {
        try {
            const souscriptions = await Souscription.findAll();
            res.json(souscriptions);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get a single subscription by ID
    async getOne(req, res) {
        try {
            const souscription = await Souscription.findByPk(req.params.id);
            if (souscription) {
                res.json(souscription);
            } else {
                res.status(404).send('Subscription not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Update a subscription
    async update(req, res) {
        try {
            const updated = await Souscription.update(req.body, {
                where: { ID_Souscription: req.params.id }
            });
            if (updated[0] === 1) {
                const updatedSouscription = await Souscription.findByPk(req.params.id);
                res.json(updatedSouscription);
            } else {
                res.status(404).send('Subscription not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Delete a subscription
    async delete(req, res) {
        try {
            const deleted = await Souscription.destroy({
                where: { ID_Souscription: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Subscription deleted');
            } else {
                res.status(404).send('Subscription not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = souscriptionController;
