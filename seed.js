const mongoose = require("mongoose");
const Product = require("./models/Product"); // Replace with the correct path to your Product model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/furniture", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");

    // Multiple products with multiple images
    const products = [
      // Category: Chair
      {
        name: "Office Chair",
        price: 149,
        old_price: 179,
        new: 1,
        quantity: "1",
        category: "Chair",
        dimensions: 20,
        stock: 30,
        description: "An ergonomic office chair for maximum comfort during work.",
        color: "Black",
        images: [
          "https://cellbell.in/cdn/shop/files/Taurus-C100-Lite-Executive-Office-Chair-Cellbell-1674805402_3.png?v=1715845404",
          "https://cdn.moglix.com/p/djsrKBRPVjQIC-xxlarge.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJbLVWNjCmBtwM27bB9u75SeAxSTSve0gKQ&s",
          "https://images-cdn.ubuy.co.in/633abe880d4bdc41321a6938-home-office-chair-ergonomic-desk-chair.jpg",
          "https://cdn.decornation.in/wp-content/uploads/2020/07/modern-dining-table-chairs.jpg"
        ]
      },
      {
        name: "Recliner Chair",
        price: 299,
        old_price: 349,
        new: 1,
        quantity: "1",
        category: "Chair",
        dimensions: 25,
        stock: 15,
        description: "A plush recliner chair with adjustable features for relaxation.",
        color: "Brown",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2kgfwyqdKCSxkisAkGmFJBbR9ib2TNjf5tQ&s",
          "https://images.woodenstreet.de/image/data/recliner/vivian-manual-1-seater-recliner-beige/1.png",
          "https://images.durian.in/Durian/durian/product/800x800/product_2022100614141665065668_65843.jpg",
          "https://images-cdn.ubuy.co.in/64cfdfcd25154c5f123de676-ficmax-recliner-chair-with-vibration.jpg",
          "https://urbandaily.in/cdn/shop/files/71DrmV_EAiL._SX679_5f173bae-5094-41a7-9f60-d12ab7fc332d.jpg?v=1709280016"
        ]
      },
      {
        name: "Dining Chair",
        price: 89,
        old_price: 109,
        new: 0,
        quantity: "1",
        category: "Chair",
        dimensions: 15,
        stock: 40,
        description: "A classic dining chair that pairs well with any dining table.",
        color: "White",
        images: [
          "https://images.durian.in/Durian/durian/product/800x800/375671692969892.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw4giT_-D1SflFDlL6TBDeVUs_Ht5s0IXjLQ&s",
          "https://5.imimg.com/data5/ANDROID/Default/2022/8/DB/OO/HG/15530766/product-jpeg.jpg",
          "https://m.media-amazon.com/images/I/512wWApJAlL._AC_UF894,1000_QL80_.jpg",
          "https://images-cdn.ubuy.co.in/64c9583d679d0329bb775303-mainstays-mid-century-modern-dining.jpg"
        ]
      },
      {
        name: "Armchair",
        price: 199,
        old_price: 229,
        new: 1,
        quantity: "1",
        category: "Chair",
        dimensions: 22,
        stock: 25,
        description: "A cozy armchair to complement your living room decor.",
        color: "Blue",
        images: [
          "https://mukerjeeschoolssociety.org/wp-content/uploads/2019/11/Gray-Armchair-Image-001-1.jpg",
          "https://www.ikea.com/in/en/images/products/ekenaeset-armchair-kilanda-light-beige__1179060_pe895831_s5.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfW3xd5N83v3pMfWZSNSNk4-sCUjafJiNq5Q&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nfD852FBXtCFHht9BCsdV8yn4U1D65LdRA&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn03hjP2B6UONjURVrzEcaDpR0PsJ54lVbIw&s"
        ]
      },
      {
        name: "Gaming Chair",
        price: 249,
        old_price: 299,
        new: 1,
        quantity: "1",
        category: "Chair",
        dimensions: 24,
        stock: 20,
        description: "A high-back gaming chair with adjustable features for the best gaming experience.",
        color: "Red",
        images: [
          "https://cdn.shopify.com/s/files/1/0290/1757/3790/products/Black-and-Red-Gaming-Chair_1200x1200.png",
          "https://cdn.shopify.com/s/files/1/2353/4683/products/gaming-chair-red_800x.jpg",
          "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/45ab83f5c013ba6e781fb5fa8d6e4a6c_8c9e9402-7715-41d4-9d19-2501208400e8.png",
          "https://images-na.ssl-images-amazon.com/images/I/61lf8ztg41L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71eJ3vG+FdL._AC_SL1500_.jpg"
        ]
      },

      // Category: Table
      {
        name: "Dining Table",
        price: 499,
        old_price: 549,
        new: 0,
        quantity: "1",
        category: "Table",
        dimensions: 40,
        stock: 10,
        description: "A modern dining table that fits perfectly in any dining room.",
        color: "Brown",
        images: [
          "https://cdn.pixabay.com/photo/2020/02/14/05/13/dining-table-4847801_1280.jpg",
          "https://cdn.pixabay.com/photo/2015/07/20/13/20/chair-852528_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/11/18/13/15/architecture-1836611_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/06/10/19/32/table-1445696_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/03/09/15/30/dining-table-1245776_1280.jpg"
        ]
      },
      {
        name: "Coffee Table",
        price: 199,
        old_price: 229,
        new: 0,
        quantity: "1",
        category: "Table",
        dimensions: 15,
        stock: 20,
        description: "A stylish coffee table for your living room.",
        color: "Glass",
        images: [
          "https://www.ikea.com/us/en/images/products/kvistbro-coffee-table-black__0737375_pe741436_s5.jpg",
          "https://www.ikea.com/us/en/images/products/lack-coffee-table-white__0737369_pe741430_s5.jpg",
          "https://www.ikea.com/us/en/images/products/gladom-tray-table-green__0737371_pe741432_s5.jpg",
          "https://www.ikea.com/us/en/images/products/linnmon-alex-table-white__0735289_pe740054_s5.jpg",
          "https://www.ikea.com/us/en/images/products/ekedalen-coffee-table__0735287_pe740053_s5.jpg"
        ]
      },
      {
        name: "Console Table",
        price: 159,
        old_price: 189,
        new: 1,
        quantity: "1",
        category: "Table",
        dimensions: 18,
        stock: 15,
        description: "A versatile console table for the hallway or living room.",
        color: "Dark Brown",
        images: [
          "https://www.ikea.com/us/en/images/products/liatorp-console-table__0735254_pe740050_s5.jpg",
          "https://www.ikea.com/us/en/images/products/hektar-console-table__0735249_pe740045_s5.jpg",
          "https://www.ikea.com/us/en/images/products/brusali-console-table__0735244_pe740040_s5.jpg",
          "https://www.ikea.com/us/en/images/products/bjursta-console-table__0735243_pe740039_s5.jpg",
          "https://www.ikea.com/us/en/images/products/forsby-console-table__0735241_pe740037_s5.jpg"
        ]
      },
      {
        name: "Work Desk",
        price: 299,
        old_price: 349,
        new: 1,
        quantity: "1",
        category: "Table",
        dimensions: 30,
        stock: 25,
        description: "An adjustable work desk for a perfect home office setup.",
        color: "Oak",
        images: [
          "https://www.ikea.com/us/en/images/products/linnmon-alex-desk-white-stained-oak__0735288_pe740055_s5.jpg",
          "https://www.ikea.com/us/en/images/products/skogsta-desk__0735285_pe740052_s5.jpg",
          "https://www.ikea.com/us/en/images/products/trotten-standing-desk__0735283_pe740049_s5.jpg",
          "https://www.ikea.com/us/en/images/products/hytti-standing-desk__0735281_pe740046_s5.jpg",
          "https://www.ikea.com/us/en/images/products/norraker-desk__0735280_pe740045_s5.jpg"
        ]
      },
      {
        name: "Outdoor Table",
        price: 129,
        old_price: 159,
        new: 1,
        quantity: "1",
        category: "Table",
        dimensions: 35,
        stock: 30,
        description: "A weather-resistant table for outdoor use.",
        color: "Teak",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCB6ZiUNCSuB0CCaPthSB08Y-JLwA668ZXag&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG1ODGlYiHZifan0E9LU6P7n6gHrskvO1cjQ&s",
          "https://images-cdn.ubuy.co.in/66145df1d84ed44d2a710f6f-costway-picnic-table-bench-set-outdoor.jpg",
          "https://www.thespruce.com/thmb/agMCiMTigXWwoplUPJTeHy1wQ6M=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc()/SPR-outdoor-table-plans-5070848-hero-e56542f9054c4a92b888438f5e598fcc.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRllBSSb8pMEPr8qpxc0aB5ZpQpBa6J3jaYdA&s"
        ]
      }
    ];

    // Insert multiple products
    Product.insertMany(products)
      .then((res) => {
        console.log("Products inserted:", res);
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error inserting products:", err);
        mongoose.connection.close();
      });

  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
