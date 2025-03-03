const User = require("../models/User");
const jwt = require("jsonwebtoken"); 

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Ensure that the comparePassword method exists on the User model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // Send the token, role, and user name in the response
    res.json({ 
      token, 
      role: user.role, 
      name: user.name // Assuming 'name' field exists in the User model
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};
