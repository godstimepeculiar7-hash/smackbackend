const mongoose = require('mongoose');

const swallowProductsSchema = new mongoose.Schema({
    name: String,
    productModel: String,
    priceCents: Number,
    kg: String,
    image: String
});

const SwallowProduct = mongoose.model('swallowProducts', swallowProductsSchema);

module.exports = SwallowProduct;