const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Endpoint to place an order
router.post('/orders/place', orderController.placeOrder);

module.exports = router;
