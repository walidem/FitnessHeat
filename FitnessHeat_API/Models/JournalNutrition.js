const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Utilisateurs = require('./Utilisateur'); 

const JournalNutrition = sequelize.define('Journal_de_Nutritions', {
    ID_Nutrition: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Calories: {
        type: Sequelize.INTEGER,
        allowNull: true 
    },
    ID_Utilisateur: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    }
}, {
    timestamps: false,
    tableName: 'Journal_de_Nutritions' 
});

module.exports = JournalNutrition;
