const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Endpoint to retrieve detailed information of a specific order by its ID
router.get('/orders/:orderId', orderController.getOrderDetails);

module.exports = router;
