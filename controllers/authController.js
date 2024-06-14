const User = require('../models/user');
const jwt = require('jsonwebtoken');


// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ "message" : "User registered successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ "message" : "successfully logged in",token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
