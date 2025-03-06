const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const susbscribeRoutes = require("./routes/susbscribeRoutes");
const registerRoutes = require("./routes/registerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminuserRoutes = require("./routes/adminuserRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const shippingRoutes = require('./routes/shippingRoutes');
const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    const data = { message: "Welcome to the Pittara Server!" };

    console.log("Data sent to client:", data); // Print data in the console
    res.json(data); // Send JSON response to the client
})
app.use("/api/product", productRoutes);
app.use("/api/subscribe", susbscribeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/login", authRoutes);
app.use("/api/register", registerRoutes );
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/adminuser", adminuserRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use('/api/shipping', shippingRoutes);
app.use("/api/payment", paymentRoutes);
app.listen(PORT, () => {
  console.log("running");
});
