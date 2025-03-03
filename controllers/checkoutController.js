const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product"); // You need to create Order model

// Checkout (Move Cart to Order)
exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const order = new Order({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      status: "Pending",
    });

    await order.save();
    await Cart.deleteOne({ userId });

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error });
  }
};

// Buy Now (Direct Order without Cart)
exports.buyNow = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const order = new Order({
      userId,
      items: [{ productId, quantity }],
      totalPrice: product.price * quantity,
      status: "Pending",
    });

    await order.save();
    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Buy now failed", error });
  }
};
