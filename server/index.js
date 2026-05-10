require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const stopRoutes = require('./routes/stops');
const activityRoutes = require('./routes/activities');
const budgetRoutes = require('./routes/budget');
const checklistRoutes = require('./routes/checklist');
const cityRoutes = require('./routes/cities');
const noteRoutes = require('./routes/notes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/stops', stopRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/notes', noteRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Traveloop server running on port ${PORT}`);
});
