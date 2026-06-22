require('dotenv').config();
const mongoose = require('mongoose');
const SwallowProduct = require('../models/swallowProducts');

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

const seedSwallowProducts = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI) ;

        await SwallowProduct.insertMany(swallow);

        console.log('Products seeded successfully');

        process.exit();
    } catch (error) {
        console.log('Error seeding products:', error);
        process.exit(1);
    }
}

seedSwallowProducts();