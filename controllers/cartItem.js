const CartItem = require('../models/CartItem');

// Controller function to add a product to the cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // Check if the product is already in the cart
        let cartItem = await CartItem.findOne({ where: { userId, productId } });
        if (cartItem) {
            // Update quantity if the product is already in the cart
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create a new cart item if the product is not in the cart
            await CartItem.create({ userId, productId, quantity });
        }
        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to view the cart
exports.viewCart = async (req, res) => {
    const { userId } = req.query; // Assuming userId is passed as a query parameter
    try {
        const cartItems = await CartItem.findAll({ where: { userId } });
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to update quantity of a product in the cart
exports.updateCartItem = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    try {
        let cartItem = await CartItem.findByPk(productId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json({ message: 'Cart item updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to remove a product from the cart
exports.removeCartItem = async (req, res) => {
    const { productId } = req.params;
    try {
        let cartItem = await CartItem.findByPk(productId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        await cartItem.destroy();
        res.json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
