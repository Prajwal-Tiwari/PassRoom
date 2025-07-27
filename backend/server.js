const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const form = express();
const port = 3000;

// Middleware
form.use(cors());
form.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/form')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed. Error:', err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Hashed password
});
const user = mongoose.model('user', UserSchema);

// ✅ Signup Route (bcrypt)
form.post('/submit', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new user({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Login Route
form.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. If successful
    res.status(200).json({ message: "Login successful", user: { name: foundUser.name, email: foundUser.email } });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Test Route
form.get('/', (req, res) => {
  res.send("Welcome to the server");
});

form.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
