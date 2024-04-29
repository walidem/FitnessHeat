const Programme = require('../Models/Programme');
const Coach = require('../Models/Coach');     
const Categorie = require('../Models/Categorie'); 

const programmeController = {
    async create(req, res) {
        try {
            console.log(req.body); 

            const { ID_Coach, ID_Categorie, ...programmeData } = req.body;

            // Check if the Coach exists
            const coachExists = await Coach.findByPk(ID_Coach);
            if (!coachExists) {
                return res.status(400).send('Coach not found');
            }

            // Check if the Categorie exists
            const categorieExists = await Categorie.findByPk(ID_Categorie);
            if (!categorieExists) {
                return res.status(400).send('Categorie not found');
            }

            // Include ID_Coach and ID_Categorie in the programmeData object
            const completeProgrammeData = { ...programmeData, ID_Coach, ID_Categorie };

            // Create Programme with all necessary data
            const newProgramme = await Programme.create(completeProgrammeData);
            res.status(201).json(newProgramme);
        } catch (error) {
            console.error(error); 
            res.status(500).send(error.message);
        }
    },
    async getAll(req, res) {
        try {
            const programmes = await Programme.findAll();
            res.json(programmes);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getOne(req, res) {
        try {
            const programme = await Programme.findByPk(req.params.id);
            if (programme) {
                res.json(programme);
            } else {
                res.status(404).send('Program not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async update(req, res) {
        try {
            const updated = await Programme.update(req.body, {
                where: { ID_Programme: req.params.id }
            });
            if (updated[0] === 1) {
                const updatedProgramme = await Programme.findByPk(req.params.id);
                res.json(updatedProgramme);
            } else {
                res.status(404).send('Program not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async delete(req, res) {
        try {
            const deleted = await Programme.destroy({
                where: { ID_Programme: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Program deleted');
            } else {
                res.status(404).send('Program not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = programmeController;
