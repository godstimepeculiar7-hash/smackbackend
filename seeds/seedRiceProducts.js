require('dotenv').config();
const mongoose = require('mongoose');
const RiceProduct = require('../models/riceProducts');

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

const seedRiceProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await RiceProduct.insertMany(riceProducts);

        console.log('Rice products seeded successfully!');

        process.exit();
    } catch (error) {
        console.error('Error seeding rice products:', error);
        process.exit(1);
    }
}

seedRiceProducts();