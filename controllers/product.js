const Product = require('../models/Product');

exports.getProductsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const products = await Product.findAll({
            where: { categoryId },
            attributes: ['id', 'title', 'price', 'description', 'availability']
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
