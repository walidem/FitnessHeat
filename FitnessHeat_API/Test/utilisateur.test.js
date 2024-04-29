// tests/utilisateur.test.js

const sequelize = require('../config/database');
const Utilisateur = require('../Models/Utilisateur');

beforeAll(async () => {
    await sequelize.sync(); 
});

describe('Utilisateur Model', () => {
    let createdUserId;

    test('Create new utilisateur', async () => {
        const userData = {
            Nom: 'Jane',
            Prenom: 'Doe',
            Email: 'janedoe@example.com',
            Mot_de_passe: 'password123',
            Date_de_naissance: new Date(1990, 1, 1),
            Sexe: 'F',
            Autres_informations_personnelles: 'Likes fitness'
        };

        const utilisateur = await Utilisateur.create(userData);
        createdUserId = utilisateur.ID_Utilisateur; 
        expect(utilisateur.Email).toBe(userData.Email);
    });

    test('Retrieve a utilisateur by ID', async () => {
        const utilisateur = await Utilisateur.findByPk(createdUserId);
        expect(utilisateur).not.toBeNull();
        expect(utilisateur.Nom).toBe('Jane');
    });

    test('Update a utilisateur', async () => {
        const updatedData = { Sexe: 'M' };
        await Utilisateur.update(updatedData, { where: { ID_Utilisateur: createdUserId }});
        const updatedUtilisateur = await Utilisateur.findByPk(createdUserId);
        expect(updatedUtilisateur.Sexe).toBe(updatedData.Sexe);
    });

    test('Delete a utilisateur', async () => {
        const result = await Utilisateur.destroy({ where: { ID_Utilisateur: createdUserId }});
        expect(result).toBe(1); 
    });
});

afterAll(async () => {
    await sequelize.close(); 
});