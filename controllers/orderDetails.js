
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const cartItems = await CartItem.findAll({ where: { orderId } });
        const products = await Promise.all(cartItems.map(async (cartItem) => {
            const product = await Product.findByPk(cartItem.productId);
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: cartItem.quantity
            };
        }));
        const orderDetails = {
            id: order.id,
            userId: order.userId,
            products,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
        res.json(orderDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
