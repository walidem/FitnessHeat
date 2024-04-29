const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Utilisateurs = require('./Utilisateur'); 
const JournalSommeil = sequelize.define('Journal_de_Sommeils', {

    ID_Sommeil: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Duree: {
        type: Sequelize.INTEGER,
        allowNull: true 
    },
    Qualite: {
        type: Sequelize.STRING,
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
    tableName: 'Journal_de_Sommeils'
});

JournalSommeil.belongsTo(Utilisateurs, { foreignKey: 'ID_Utilisateur' });

module.exports = JournalSommeil;