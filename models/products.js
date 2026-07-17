const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    priceCents: Number,
    kg: String,
    image: String
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;