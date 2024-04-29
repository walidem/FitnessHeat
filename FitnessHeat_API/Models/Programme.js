const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Programme = sequelize.define('Programmes', {
    
    ID_Programme: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    Titre: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Description: {
        type: Sequelize.TEXT,
        allowNull: true 
    },
    Type: {
        type: Sequelize.STRING(255),
        allowNull: true 
    },
    ID_Coach: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ID_Categorie: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    }
}, {
    tableName: 'Programmes', 
    timestamps: false 
});

module.exports = Programme;