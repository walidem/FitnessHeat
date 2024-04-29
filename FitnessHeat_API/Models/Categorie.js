const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define('Categories', {
    ID_Categorie: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NomCategorie: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'Categories', 
    timestamps: false 
});

module.exports = Categorie;
