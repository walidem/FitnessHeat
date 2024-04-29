const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Utilisateurs = require('./Utilisateur'); 
const JournalPoids = sequelize.define('Journal_de_Poids', {
    
    ID_Poids: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Poids: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true 
    },
    ID_Utilisateur: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'Utilisateurs', 
            key: 'ID_Utilisateur',
        }
    }
}, {
    timestamps: false,
    tableName: 'Journal_de_Poids' 
});

JournalPoids.belongsTo(Utilisateurs, { foreignKey: 'ID_Utilisateur' });

module.exports = JournalPoids;