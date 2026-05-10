const express = require('express');
const { getCities, searchCities } = require('../controllers/cityController');

const router = express.Router();

router.get('/', getCities);
router.get('/search', searchCities);

module.exports = router;
