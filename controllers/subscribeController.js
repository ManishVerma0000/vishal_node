const Subscribe = require("../models/Subscribe");

exports.postSubscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscribe = Subscribe({ email });
    await newSubscribe.save();
    res.status(201).json(newSubscribe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
