const express = require('express');
const router = express.Router();
const cartController = require('../controllers/categoryController');

// Endpoint to add a product to the cart
router.post('/cart/add', cartController.addToCart);

// Endpoint to view the cart
router.get('/cart', cartController.viewCart);

// Endpoint to update quantity of a product in the cart
router.put('/cart/update/:productId', cartController.updateCartItem);

// Endpoint to remove a product from the cart
router.delete('/cart/remove/:productId', cartController.removeCartItem);

module.exports = router;
