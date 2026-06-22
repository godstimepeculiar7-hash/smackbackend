const mongoose = require('mongoose');

const riceProductSchema = new mongoose.Schema({
    name: String,
    priceCents: Number,
    kg: String,
    image: String
});

const RiceProduct = mongoose.model('riceProducts', riceProductSchema);

module.exports = RiceProduct;