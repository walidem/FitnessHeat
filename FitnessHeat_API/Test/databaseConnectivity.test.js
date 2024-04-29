const sequelize = require('../config/database.js');

describe('Database Connectivity', () => {
  it('should connect to the database successfully', async () => {
    try {
      await sequelize.authenticate();
      expect(true).toBe(true); 
    } catch (error) {

      console.error('Failed to connect to the database:', error);
      expect(error).toBeUndefined(); 
    }
  });

  afterAll(async () => {
    try {
      await sequelize.close(); 
    } catch (error) {
      console.error('Failed to close the database connection:', error);
    }
  });
});