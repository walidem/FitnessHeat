const Categorie = require('../Models/Categorie'); 

const categorieController = {
    // Create a new category
    async create(req, res) {
        try {
            const newCategorie = await Categorie.create(req.body);
            res.status(201).json(newCategorie);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get all categories
    async getAll(req, res) {
        try {
            const categories = await Categorie.findAll();
            res.json(categories);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get a single category by ID
    async getOne(req, res) {
        try {
            const categorie = await Categorie.findByPk(req.params.id);
            if (categorie) {
                res.json(categorie);
            } else {
                res.status(404).send('Category not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Update a category
    async update(req, res) {
        try {
            const updated = await Categorie.update(req.body, {
                where: { ID_Categorie: req.params.id }
            });
            if (updated[0] === 1) {
                const updatedCategorie = await Categorie.findByPk(req.params.id);
                res.json(updatedCategorie);
            } else {
                res.status(404).send('Category not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Delete a category
    async delete(req, res) {
        try {
            const deleted = await Categorie.destroy({
                where: { ID_Categorie: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Category deleted');
            } else {
                res.status(404).send('Category not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = categorieController;
