const mongoose = require('mongoose');

// Create a schema for our cart

const cartSchema = new mongoose.Schema({
    // Each cart belongs to one user (for now)
    // Later, we can replace sessionId with userId when we implement authentication.

    sessionId: {
        type: String,
        required: true
    },

    // items in an array because a cart can contain many products
    items: [
        {
            // Store the id of the product
            // this id refers to a document in the Products collection
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'riceProducts',
                required: true
            },

            // Store how many of the product the user wants to buy
            quantity: {
                type: Number,
                // if quantity is not provided, use 1 as the default value
                default: 1,

                // Prevent quantiry from becoming 0 or negative
                min: 1

            }
        }
    ]
});

// Create a model called Cart

const Cart = mongoose.model('Cart', cartSchema);

// Export the Cart model so we can use it in other files
module.exports = Cart;