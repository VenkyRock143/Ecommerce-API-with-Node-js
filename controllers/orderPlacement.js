
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

exports.placeOrder = async (req, res) => {
    const { userId } = req.body;
    try {
        // Retrieve cart items for the user
        const cartItems = await CartItem.findAll({ where: { userId } });
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Add products to cart before placing an order' });
        }
        
        // Create order with cart items
        const order = await Order.create({ userId });
        await order.addCartItems(cartItems);

        // Clear cart after placing the order
        await CartItem.destroy({ where: { userId } });

        res.json({ message: 'Order placed successfully', orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
