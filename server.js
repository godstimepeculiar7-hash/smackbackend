require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const RiceProduct = require('./models/riceProducts');
const SwallowProduct = require('./models/swallowProducts');
const Cart = require('./models/cart');
const cors = require('cors');

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.get('/rice-products', async (req, res) => {
    try {
        const products = await RiceProduct.find();

        res.json(products);
    } catch (error) {
        console.error('Error fetching rice products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/swallow-products', async (req, res) => {
    try {
        const products = await SwallowProduct.find();

        res.json(products);
    } catch (error) {
        console.log('Error fetching swallow products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/', (req, res) => {
    res.json({
        message: 'Smack backend is live!'
    });
});

// This code below is the Add to cart logic

let cart = [];
let orders = [];

// Add a product to cart
app.post('/cart', async (req, res) => {
    try {
        // Get sessionId and productId from request body
        const { sessionId, productId } = req.body;

        // Look for a cart that belongs to this session
        let cart = await Cart.findOne({ sessionId });
        let item;

        if (!cart) {

            // Create a new cart
            cart = new Cart({
                // This cart belongs to this user
                sessionId,

                // Add the first product to the cart
                items: [{
                    productId,
                    quantity: 1,
                    deliveryOptionId: 1
                }]
            });
        } else {
            // Look for this product inside the cart
            item = cart.items.find((item) => {
                return item.productId.toString() === productId;
            });

            // If product already exists in the cart
            if (item) {
                item.quantity += 1;
            } else {
                // Add the product to the cart
                cart.items.push({
                    productId,
                    quantity: 1,
                    deliveryOptionId: 1
                });
            }
        }



        // Save changes to MongoDB
        await cart.save();

        // Send the updated cart back to the frontend
        res.json(cart);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }

});

// The code below calculates the total quantiy of the cart

app.get('/cart-quantity', async (req, res) => {
    try {
        // Get the sessionId that the frontend sent in the URL
        const { sessionId } = req.query;
        console.log('Session ID:', sessionId);

        // Find the cart that belongs to this session
        const cart = await Cart.findOne({ sessionId });
        console.log('Cart:', cart);

        // If no cart exists, return 0
        if (!cart) {
            return res.json({
                totalQuantity: 0
            })
        }

        // Add together the quantity of every item in the cart
        const totalQuantity = cart.items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        // Send the total quantity back to the frontend
        res.json({
            totalQuantity
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

app.get('/checkout', async (req, res) => {
    try {
        // Get the sessionId that the frontend sent in the URL
        const { sessionId } = req.query;

        // Find the cart that belongs to this session
        const cart = await Cart.findOne({ sessionId }).populate('items.productId');
        console.log(cart);

        // If the user has not cart yet,
        // return an empty list of items
        if(!cart) {
            return res.json({
                items: []
            })
        } 
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        })
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});