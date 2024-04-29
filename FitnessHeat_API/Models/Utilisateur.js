const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Utilisateurs = sequelize.define('Utilisateurs', {
    ID_Utilisateur: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Prenom: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Mot_de_passe: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    NomUtilisateur: {  
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    Email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    Telephone: {
        type: Sequelize.STRING(20),
        allowNull: true 
    },
    Date_de_naissance: {
        type: Sequelize.DATEONLY, 
        allowNull: true 
    },
    Sexe: {
        type: Sequelize.STRING(10),
        allowNull: true 
    },
    Taille: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true 
    },
    Poids: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true 
    },
    Objectif: {
        type: Sequelize.TEXT,
        allowNull: true 
    }
}, {
    tableName: 'Utilisateurs',
    timestamps: false 
});

module.exports = Utilisateurs;