const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Endpoint to fetch order history for authenticated users
router.get('/orders/history', orderController.getOrderHistory);

module.exports = router;
