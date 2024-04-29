// Controllers/utilisateurController.js

const Utilisateur = require('../Models/Utilisateur');

const utilisateurController = {
    async create(req, res) {
        try {
            const newUser = await Utilisateur.create(req.body);
            res.status(201).json({ message: 'User created successfully', data: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const utilisateurs = await Utilisateur.findAll();
            res.json({ message: 'Users retrieved successfully', data: utilisateurs });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error: error.message });
        }
    },

    async getOne(req, res) {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        if (utilisateur) {
            res.json({ message: 'User found', data: utilisateur });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
},

    async loginUtilisateur(req, res) {
        try {
            const { NomUtilisateur, Mot_de_passe } = req.body;
            const utilisateur = await Utilisateur.findOne({
                where: { NomUtilisateur, Mot_de_passe }
            });
            if (utilisateur) {
                res.json({ message: 'User found', data: utilisateur });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error: error.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await Utilisateur.update(req.body, {
                where: { ID_Utilisateur: req.params.id }
            });
            if (updated[0] === 1) {
                const updatedUser = await Utilisateur.findByPk(req.params.id);
                res.json({ message: 'User updated successfully', data: updatedUser });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },

 
    
    async delete(req, res) {
        try {
            const deleted = await Utilisateur.destroy({
                where: { ID_Utilisateur: req.params.id }
            });
            if (deleted) {
                res.status(204).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
};

module.exports = utilisateurController;
