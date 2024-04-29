const express = require('express');
const app = express();
const cors = require('cors');

// Activation de CORS
const corsOptions = {
  origin: ['http://localhost:5501', 'http://127.0.0.1:5501']
};

app.use(cors(corsOptions));

// Import routes
const utilisateurRoutes = require('./Routes/utilisateurRoutes');
const programmeRoutes = require('./Routes/programmeRoutes');
const journalNutritionRoutes = require('./Routes/journalNutritionRoutes');
const journalSommeilRoutes = require('./Routes/journalSommeilRoutes');
const journalPoidsRoutes = require('./Routes/journalPoidsRoutes');
const categorieRoutes = require('./Routes/categorieRoutes');
const souscriptionRoutes = require('./Routes/souscriptionRoutes');
const coachRoutes = require('./Routes/coachRoutes');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Setup routes
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/programmes', programmeRoutes);
app.use('/api/journalNutrition', journalNutritionRoutes);
app.use('/api/journalSommeil', journalSommeilRoutes);
app.use('/api/journalPoids', journalPoidsRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/souscriptions', souscriptionRoutes);
app.use('/api/coachs', coachRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send('error');
});

// Set the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});