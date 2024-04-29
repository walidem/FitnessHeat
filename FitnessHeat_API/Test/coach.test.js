// tests/coach.test.js

const sequelize = require('../config/database');
const Coach = require('../Models/Coach');

beforeAll(async () => {
    await sequelize.sync(); 
});

describe('Coach Model', () => {
    test('Create new coach', async () => {
        const coachData = {
            Nom: 'John',
            Prenom: 'Doe',
            Email: 'johndoe@example.com',
            Telephone: '1234567890',

        };

        const coach = await Coach.create(coachData);
        expect(coach.Nom).toBe('John');
        expect(coach.Prenom).toBe('Doe');
        expect(coach.Email).toBe('johndoe@example.com');

    });

    test('Retrieve a coach', async () => {
        const coach = await Coach.findOne({ where: { Email: 'johndoe@example.com' }});
        expect(coach).not.toBeNull();
        expect(coach.Nom).toBe('John');
        expect(coach.Prenom).toBe('Doe');
    });

    test('Delete a coach', async () => {
        const result = await Coach.destroy({ where: { Email: 'johndoe@example.com' }});
        expect(result).toBe(1); 
    });
});

afterAll(async () => {
    await sequelize.close(); 
});