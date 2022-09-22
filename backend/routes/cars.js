const express = require('express');
const { getAllCars, getCarDetailsById, getComparedCarsData, addFeedback, removeFeedback } = require('../controllers/cars');

const router = express.Router();

router.get('/', getAllCars);

router.get('/:id', getCarDetailsById);

router.get('/cars/compare-cars', getComparedCarsData);

router.post('/feedback/add/:id', addFeedback);

router.post('/feedback/remove/:id', removeFeedback);

module.exports = router;
