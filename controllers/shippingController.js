const ShippingAddress = require('../models/ShippingAddress');

exports.addShippingAddress = async (req, res) => {
    try {
        const { fullName, email, phone, address, city, state, postalCode, country } = req.body;

        const newAddress = new ShippingAddress({
            user: req.user.id, // Assuming authentication middleware adds `user` to `req`
            fullName,
            email, // Added email field
            phone,
            address,
            city,
            state,
            postalCode,
            country,
        });

        await newAddress.save();
        res.status(201).json({ message: 'Shipping address added successfully', address: newAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getShippingAddress = async (req, res) => {
    try {
        const address = await ShippingAddress.findOne({ user: req.user.id });
        if (!address) return res.status(404).json({ message: 'No shipping address found' });

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateShippingAddress = async (req, res) => {
    try {
        const updatedAddress = await ShippingAddress.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedAddress) return res.status(404).json({ message: 'Shipping address not found' });

        res.status(200).json({ message: 'Shipping address updated', address: updatedAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
