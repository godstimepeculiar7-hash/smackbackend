require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products');
const Cart = require('./models/cart');
const cors = require('cors');
const deliveryOptions = require('./data/deliveryOptions');
const axios = require('axios');
const geolib = require('geolib');

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

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        console.error('Error fetching rice products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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

        // If the user has not cart yet,
        // return an empty list of items
        if (!cart) {
            return res.json({
                items: []
            })
        }

        res.json({
            items: cart.items
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        })
    }
});

// This code below is the delivery options logic
app.get('/delivery-options', (req, res) => {
    res.json(deliveryOptions);
})

app.put('/cart/delivery-option', async (req, res) => {
    try {
        const { sessionId, productId, deliveryOptionId } = req.body;

        // Find the cart that belongs to this session
        const cart = await Cart.findOne({ sessionId });

        // checks if the cart exists
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        // Find the item in the cart that matches the productId
        const item = cart.items.find((item) => {
            return item.productId.toString() === productId;
        })

        // checks if the item exists

        if (!item) {
            return res.status(404).json({
                message: 'Item not found in cart'
            })
        }

        // Update the delivery option for this item
        item.deliveryOptionId = deliveryOptionId;

        // Save changes to MongoDB
        await cart.save();

        res.json({
            message: 'Delivery option updated successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }




})

app.put('/update-quantity', async (req, res) => {
    try {
        const { sessionId, productId, quantity } = req.body;

        // Find the cart that belongs to this session
        const cart = await Cart.findOne({ sessionId });

        // checks if the cart exists
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            })
        }

        // find the item in the cart that matches the productId
        const item = cart.items.find((item) => {
            return item.productId.toString() === productId;
        })

        // checks if the item exists
        if (!item) {
            return res.status(404).json({
                message: 'Item not found in the Cart'
            })
        }
        // updating the quantity for this item
        item.quantity = quantity;

        // save changes to MongoDB
        await cart.save();

        res.json({
            message: 'Quantity updated successfully'
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

app.delete('/cart', async (req, res) => {
    try {
        const { sessionId, productId } = req.body;

        // Find the cart that belongs to this session
        const cart = await Cart.findOne({ sessionId });

        // checks if the cart exists
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            })
        }

        // find the item in the cart that matches the productId, and deleting it from the cart
        cart.items = cart.items.filter((item) => {
            return item.productId.toString() !== productId;
        });

        // save changes to MongoDB
        await cart.save();

        res.json({
            message: 'Item removed successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

app.get('/payment-summary', async (req, res) => {
    try {
        const { sessionId } = req.query;

        // Find the cart that belongs to this session
        const cart = await Cart.findOne({ sessionId }).populate('items.productId');

        // checks if the cart exists
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            })
        }

        const itemsTotal = cart.items.reduce((total, item) => {
            return total + (item.productId.priceCents * item.quantity)
        }, 0);

        const shippingTotal = cart.items.reduce((total, item) => {
            const deliveryOption = deliveryOptions.find((deliveryOption) => {
                return deliveryOption.id === item.deliveryOptionId;
            });
            return total + (deliveryOption?.priceCents || 0)
        }, 0);

        const totalBeforeTax = itemsTotal + shippingTotal;

        const TAX_RATE = 0.1; // 10% tax rate

        const tax = totalBeforeTax * TAX_RATE;

        const totalCost = totalBeforeTax + tax;

        res.json({
            itemsTotal,
            shippingTotal,
            totalBeforeTax,
            tax,
            totalCost
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

app.post('/checkout/location', async (req, res) => {
    try {
        const { sessionId, latitude, longitude } = req.body;

        // Customers location
        const customerLocation = {
            latitude,
            longitude
        }

        // Restaurants location
        const restaurantLocation = {
            latitude: 4.878224,
            longitude: 7.133631
        };

        // calculate the distance between the restaurant and the user's location
        const distance = geolib.getDistance(customerLocation, restaurantLocation);
        console.log(distance);

        return res.json({
            message: 'Location received successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});