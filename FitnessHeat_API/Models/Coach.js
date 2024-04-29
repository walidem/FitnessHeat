const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Coach = sequelize.define('Coaches', {
    ID_Coach: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nom: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Prenom: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING(150),
        unique: true,
        allowNull: false
    },
    Matricule: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
    },
    Mot_de_passe: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Telephone: {
        type: Sequelize.STRING(20),
        allowNull: true 
    },
    Date_de_naissance: {
        type: Sequelize.DATEONLY, 
        allowNull: true 
    },
    Annee_experience: {
        type: Sequelize.INTEGER,
        allowNull: true 
    },
    Specialisations: {
        type: Sequelize.TEXT,
        allowNull: true 
    }
}, {
    tableName: 'Coaches', 
    timestamps: false 
});

module.exports = Coach;
