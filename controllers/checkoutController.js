const nodemailer = require("nodemailer");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const ShippingAddress = require("../models/ShippingAddress");

exports.checkout = async (req, res) => {
  try {
      const { paymentMethod, paymentId } = req.body;
      const userId = req.user.id;

      console.log("Received checkout request:", req.body);

      if (!paymentMethod) {
          return res.status(400).json({ message: "Payment method is required" });
      }

      // Fetch shipping address
      const shippingAddress = await ShippingAddress.findOne({ user: userId });
      if (!shippingAddress) {
          return res.status(400).json({ message: "Shipping address not found. Please add an address." });
      }

      console.log("Fetched Shipping Address:", shippingAddress);

      // Fetch cart items
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Cart is empty" });
      }

      console.log("Cart Items:", cart.items);

      const formattedAddress = formatAddress(shippingAddress);
      const order = new Order({
          userId,
          items: cart.items,
          totalPrice: cart.totalPrice,
          status: paymentMethod === "COD" ? "Pending" : "Processing",
          paymentMethod,
          paymentId: paymentId || null,
          address: formattedAddress,
      });

      await order.save();
      await Cart.deleteOne({ userId });

      // Send Email Notification
      await sendOrderNotification(order, formattedAddress);

      res.status(200).json({ 
          message: "Order placed successfully", 
          order, 
          shippingAddress: formattedAddress 
      });
  } catch (error) {
      console.error("Checkout Error:", error);
      res.status(500).json({ message: "Checkout failed", error: error.message || error });
  }
};


exports.buyNow = async (req, res) => {
  try {
      const { productId, quantity, paymentMethod } = req.body;
      const userId = req.user.id;

      if (!paymentMethod) {
          return res.status(400).json({ message: "Payment method is required" });
      }

      // Fetch shipping address
      const shippingAddress = await ShippingAddress.findOne({ user: userId });
      if (!shippingAddress) {
          return res.status(400).json({ message: "Shipping address not found. Please add an address." });
      }

      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const formattedAddress = formatAddress(shippingAddress);
      const order = new Order({
          userId,
          items: [{ productId, quantity }],
          totalPrice: product.price * quantity,
          status: paymentMethod === "COD" ? "Pending" : "Processing",
          paymentMethod,
          address: formattedAddress,
      });

      await order.save();

      // Send Email Notification
      await sendOrderNotification(order, formattedAddress);

      res.status(200).json({ 
          message: "Order placed successfully", 
          order, 
          shippingAddress: formattedAddress 
      });
  } catch (error) {
      console.error("Buy Now Error:", error);
      res.status(500).json({ message: "Buy now failed", error });
  }
};
function formatAddress(address) {
  return `${address.fullName}, ${address.address}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`;
}

// **Updated Email Notification Function**
async function sendOrderNotification(order, formattedAddress) {
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "vishal@acmemedia.in",
          pass: "Singhvishal@123",
      },
  });

  const mailOptions = {
      from: "vishal@acmemedia.in",
      to: "vksingh2992000@gmail.com, deliverypartner@gmail.com",
      subject: "New Order Placed",
      html: `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total Price:</strong> ₹${order.totalPrice}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <h3>Shipping Address:</h3>
      <p>${formattedAddress}</p>
      <h3>Items:</h3>
      <ul>
          ${order.items
          .map(
              (item) =>
                  `<li>${item.productId.name} - ${item.quantity} pcs</li>`
          )
          .join("")}
      </ul>
      <p>Please process the order as soon as possible.</p>
      `,
  };

  await transporter.sendMail(mailOptions);
}
