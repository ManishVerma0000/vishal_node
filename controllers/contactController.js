const Contact = require("../models/Contact");

exports.postContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newNumber = Contact({ name, email, phone, message });
    await newNumber.save();
    res.status(201).json(newNumber)
  } catch (err) {
    res.status(400).json({message:err.message})
  }
};
