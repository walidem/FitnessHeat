const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Utilisateurs = require('./Utilisateur'); 
const Programmes = require('./Programme'); 
const Souscription = sequelize.define('Souscriptions', {
    
    ID_Souscription: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    DateSouscription: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    Actif: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
    },
    ID_Utilisateur: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    ID_Programme: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
}, {
    timestamps: false,
    tableName: 'Souscriptions' 
});

module.exports = Souscription;