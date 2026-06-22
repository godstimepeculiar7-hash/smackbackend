require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const RiceProduct = require('./models/riceProducts');
const SwallowProduct = require('./models/swallowProducts');
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

app.get('/products', async (req, res) => {
    await Product.create({
        name: "Coke",
        price: 1000
    })
    const products = await Product.find();

    res.json(products);
});

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
    try{
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

const riceProducts = [
    {
        id: crypto.randomUUID(),
        name: "Jollof Rice and Chicken",
        priceCents: 1,
        kg: "Kcal: 480 | Protein: 30g",
        image: 'https://anywhererecipes.com/wp-content/uploads/2025/10/Jollof-rice-and-chicken-recipe.jpg'
    }, {
        id: crypto.randomUUID(),
        name: "Fried Rice and Chicken",
        priceCents: 9800,
        kg: "Kcal: 380 | Protein: 50g",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6lj65Xdp8tuUeodA8MYSU1Kgd4elmpoQog&s'
    }, {
        id: crypto.randomUUID(),
        name: "Jollo Rice and Turkey",
        priceCents: 15000,
        kg: "Kcal: 380 | Protein: 50g",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Ev-xu5aTK9rLZkwvf7faRLTW_SXtRw3NLQ&s'
    }, {
        id: crypto.randomUUID(),
        name: "Jollof Rice and Meat",
        priceCents: 10500,
        kg: "Kcal: 380 | Protein: 50g",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuKLoL-jltuJiW_TRkZPFp6CrUCTTnfrseqQ&s'
    }, {
        id: crypto.randomUUID(),
        name: "Chicken Sauce",
        priceCents: 7800,
        kg: "Kcal: 380 | Protein: 50g",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5dfPVVXk78ydcYZOm2s719K4DqETH-Hclsw&s'
    }, {
        id: crypto.randomUUID(),
        name: "Jollof Rice and Plantain",
        priceCents: 9500,
        kg: "Kcal: 380 | Protein: 50g",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyyPsh4DnR-XeNQH6_a8Z-uQg_bHdu_coCbQ&s'
    }, {
        id: crypto.randomUUID(),
        name: "Jollof Rice and Fried Meat",
        priceCents: 8000,
        kg: "Kcal: 380 | Protein: 50g",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzIVd-wOgpgnmQbHk12MlSbmJtF-kHR7Jv6w&s'
    }
    , {
        id: crypto.randomUUID(),
        name: "Fried Rice and Beef",
        priceCents: 7000,
        kg: "Kcal: 380 | Protein: 50g",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYjRkmI3fnQ9YlscSLtVbw3GLi6W6EQ9iIA&s'
    }

];

app.get('/rice', (req, res) => {
    res.json(riceProducts);
})

const swallow = [
    {
        id: crypto.randomUUID(),
        name: "Egusi soup and Eba",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ym0DIny2Pce-DGT-IafP2mMf6BmROKKmnw&s",
        priceCents: 5000,
        kg: "Kcal: 220 | protein: 30g"
    },


    {
        id: crypto.randomUUID(),
        name: "Okra soup and Semovita",
        image: "https://i.ytimg.com/vi/sziLuU3Yzso/maxresdefault.jpg",
        priceCents: 5000,
        kg: "Kcal: 220 | protein: 30g"
    },


    {
        id: crypto.randomUUID(),
        name: "Edikang Ikong and Fufu",
        image: "https://static.wixstatic.com/media/6cadac_21e3d4783aa34e7383552874e393eb6a~mv2.jpeg/v1/fill/w_568,h_638,al_c,lg_1,q_85,enc_avif,quality_auto/6cadac_21e3d4783aa34e7383552874e393eb6a~mv2.jpeg",
        priceCents: 6000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Afang soup with Goat meat",
        image: "https://feastandbeyond.co.uk/wp-content/uploads/2023/10/Afang-Soup-600x600.jpeg",
        priceCents: 7000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Bitterleaf soup with Assorted meat",
        image: "https://wigmoretrading.com/wp-content/uploads/2024/08/Bitterleaf-Soup.jpg",
        priceCents: 6500,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: " Groundnut soup with Fish",
        image: "https://api.flavournetwork.ca/wp-content/uploads/2023/01/groundnut-soup-feat.jpg?w=3840&quality=75",
        priceCents: 6000,
        kg: "Kcal: 220 | protein: 30g"
    },



    {
        id: crypto.randomUUID(),
        name: "Oha soup with Beef",
        image: "https://e4ma.kastechnet.com/wp-content/uploads/2021/09/Ora-Oha-Soup.jpg",
        priceCents: 7000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Nsala soup with Catfish",
        image: "https://i.ytimg.com/vi/FB7d7WoRlwk/maxresdefault.jpg",
        priceCents: 7500,
        kg: "Kcal: 220 | protein: 30g"

    },



    {
        id: crypto.randomUUID(),
        name: "Afia Efere with Chicken",
        image: "https://steemitimages.com/1280x0/https://steemitimages.com/DQmTLMkdWtb9GSx7GRtwp6YSZExEzY3Ld9MZsCZ5pCpJuo2/white-soup3.jpg",
        priceCents: 8000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Ewedu soup with Assorted meat",
        image: "https://shopafricausa.com/cdn/shop/articles/abula-gbegiri-recipe-img-2_600x.jpg?v=1657717654",
        priceCents: 5500,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Vegetable soup with Fish",
        image: "https://thumbs.dreamstime.com/b/nigerian-vegetable-soup-fish-bush-meat-white-plate-afang-large-dinner-traditional-edikang-ikong-disht-348084862.jpg",
        priceCents: 6000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Egusi pepper soup with Goat meat",
        image: "https://i.ytimg.com/vi/6nMzGv8bQAQ/maxresdefault.jpg",
        priceCents: 7000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Banga soup with Catfish and meat",
        image: "https://www.myactivekitchen.com/wp-content/uploads/2015/03/niger-delta-banga-soup-recipe-img-10.jpg",
        priceCents: 7500,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Ofe Akwu with Chicken",
        image: "https://morielsoasis.ca/cdn/shop/files/rn-image_picker_lib_temp_646160ec-2b2b-47b3-a74f-923ed6b58e90.png?v=1729516761&width=1946",
        priceCents: 8000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Atama soup",
        image: "https://www.allnigerianrecipes.com/wp-content/uploads/2019/04/abak-atama-soup.jpg",
        priceCents: 6500,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Afang soup with Fish",
        image: "https://feastandbeyond.co.uk/wp-content/uploads/2023/10/Afang-Soup-600x600.jpeg",
        priceCents: 6000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Edikang Ikong with Goat meat",
        image: "https://static.wixstatic.com/media/6cadac_21e3d4783aa34e7383552874e393eb6a~mv2.jpeg/v1/fill/w_568,h_638,al_c,lg_1,q_85,enc_avif,quality_auto/6cadac_21e3d4783aa34e7383552874e393eb6a~mv2.jpeg",
        priceCents: 7000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Okra soup with Beef",
        image: " https://allnigerianfoods.com/wp-content/uploads/okro_soup_recipe.jpg",
        priceCents: 7500,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Egusi soup with Catfish",
        image: "https://allnigerianfoods.com/wp-content/uploads/egusi-catfish-soup1.jpg",
        priceCents: 8000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Oha soup with Chicken",
        image: "https://www.avilauk.com/wp-content/uploads/2020/11/rsz_oha_soup_org.jpg",
        priceCents: 8500,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Banga soup with Assorted meat",
        image: "https://www.fmnfoods.com/wp-content/uploads/2020/07/banga_soup_-600.jpg",
        priceCents: 7000,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Nsala soup with Fish",
        image: "https://i.ytimg.com/vi/FB7d7WoRlwk/maxresdefault.jpg",
        priceCents: 7500,
        kg: "Kcal: 220 | protein: 30g"
    },

    {
        id: crypto.randomUUID(),
        name: "Afia Efere with Goat meat",
        image: "https://discoverakwaibom.com/wp-content/uploads/2024/05/afia-2.jpg",
        priceCents: 8000,
        kg: "Kcal: 220 | protein: 30g"
    },


]

app.get('/swallow', (req, res) => {
    res.json(swallow);
});

// This code below is the Add to cart logic

let cart = [];
let orders = [];

app.post('/cart', (req, res) => {
    const { productId } = req.body;

    const existingItems = cart.find(cartItem => cartItem.productId === productId)

    if (existingItems) {
        existingItems.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    };
    res.json(cart);
});

// The code below calculates the total quantiy of the cart

app.get('/cart-quantity', (req, res) => {

    const total = cart.reduce((sum, cartItem) => {
        return sum + cartItem.quantity
    }, 0);

    res.json({ total });
});

// 

app.get('/cart', (req, res) => {
    const allProducts = [...riceProducts, ...swallow];

    const cartDetails = cart.map((cartItem) => {
        const matchingProduct = allProducts.find((product) => {
            return product.id === cartItem.productId;
        });

        return {
            ...matchingProduct,
            quantity: cartItem.quantity,
            deliveryOptionId: cartItem.deliveryOptionId
        };
    });
    res.json(cartDetails);
});

const deliveryOptions = [{
    id: '1',
    deliveryHours: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryHours: 3,
    priceCents: 1000
}, {
    id: '3',
    deliveryHours: 1,
    priceCents: 1500
}];

app.get('/delivery-options', (req, res) => {
    res.json(deliveryOptions);
});

app.put('/cart/delivery-option', (req, res) => {

    const { productId } = req.body
    const { deliveryOptionId } = req.body

    const matchingItem = cart.find((item) => {
        return item.productId === productId;
    });

    if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
    }

    res.json({
        message: 'Updated'
    });

});

app.delete('/cart-delete/:productId', (req, res) => {
    const productId = req.params.productId;

    cart = cart.filter((items) => {
        return items.productId !== productId;
    });

    res.json({
        message: 'Deleted successfully'
    });
});

app.get('/payment-summary', (req, res) => {

    const allProducts = [...riceProducts, ...swallow];

    let itemsTotal = 0;
    let shippingTotal = 0;

    cart.forEach((cartItem) => {

        // FIND PRODUCT
        const matchingProduct = allProducts.find((product) => {
            return product.id === cartItem.productId;
        });

        // ITEMS TOTAL
        itemsTotal += matchingProduct.priceCents * cartItem.quantity;

        // FIND DELIVERY OPTION
        const deliveryOption = deliveryOptions.find((option) => {
            return option.id === cartItem.deliveryOptionId;
        });

        // SHIPPING TOTAL
        shippingTotal += deliveryOption.priceCents;

    });

    const totalBeforeTax = itemsTotal + shippingTotal;

    const tax = totalBeforeTax * 0.1;

    const orderTotal = totalBeforeTax + tax;

    res.json({
        itemsTotal,
        shippingTotal,
        totalBeforeTax,
        tax,
        orderTotal
    });

});

const shopLocation = {
    lat: 6.5244,
    lng: 3.3792
};

function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

app.post("/checkout/location", async (req, res) => {
    const { lat, lng } = req.body;

    // 1. Calculate distance
    const distance = getDistanceInKm(
        shopLocation.lat,
        shopLocation.lng,
        lat,
        lng
    );

    const MAX_DISTANCE_KM = 500; // more realistic for testing

    // 2. Reverse geocoding (get address)
    let address = null;

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            {
                headers: {
                    "User-Agent": "checkout-app"
                }
            }
        );

        const data = await response.json();
        address = data?.display_name || null;
    } catch (error) {
        console.log("Reverse geocoding failed:", error.message);
    }

    // 3. If too far → reject
    if (distance > MAX_DISTANCE_KM) {
        return res.status(400).json({
            allowed: false,
            message: "You are too far from the shop",
            distance,
            address
        });
    }

    // 4. Allow checkout
    return res.json({
        allowed: true,
        message: "You can proceed to payment",
        distance,
        address
    });
});

app.post('/create-order', (req, res) => {

    const allProducts = [...riceProducts, ...swallow];

    const orderItems = cart.map(cartItem => {

        const matchingProduct = allProducts.find(product => {
            return product.id === cartItem.productId;
        });

        return {
            ...matchingProduct,
            quantity: cartItem.quantity,
            deliveryOptionId: cartItem.deliveryOptionId
        };
    });

    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = orderItems.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);

    orders.push({
        id: crypto.randomUUID(),
        orderDate: new Date(),
        totalQuantity,
        totalPrice,
        items: orderItems
    });

    cart = [];

    res.json({
        message: 'Order created successfully'
    });
});

app.get('/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});