const User = require("../models/User");

exports.postRegister = async (req, res) => {
    const { name, email, password, role } = req.body; // Include name in request body
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            name,  // Add name field
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "Error registering user" });
    }
};
