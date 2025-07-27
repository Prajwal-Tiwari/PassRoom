const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const crypto = require('crypto');

const form = express();
const port = 3000;

// ===🔐 AES ENCRYPTION CONFIG ===
const ENCRYPTION_KEY = crypto
  .createHash('sha256')
  .update('your_super_secret_key_123') // Use ENV in production
  .digest('base64')
  .substr(0, 32);
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const [ivHex, encryptedText] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// ===🛡 Middleware ===
form.use(cors({
  origin: ['http://localhost:5173', 'http://dashboard.localhost:5174'],
  credentials: true
}));
form.use(express.json());

// ===📦 MongoDB Connection ===
mongoose.connect('mongodb://localhost:27017/form')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed. Error:', err));

// ===👤 User Schema (still using bcrypt) ===
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const user = mongoose.model('user', UserSchema);

// ===🔐 Credential Schema (AES Encrypted password) ===
const credentialSchema = new mongoose.Schema({
  website: String,
  username: String,
  password: String, // AES Encrypted
});
const Credential = mongoose.model('Credential', credentialSchema);

// ===📩 Route to Add Credential ===
form.post('/add-credential', async (req, res) => {
  try {
    const { website, username, password } = req.body;
    const encryptedPassword = encrypt(password);

    const newCredential = new Credential({
      website,
      username,
      password: encryptedPassword,
    });

    await newCredential.save();
    res.status(201).json({ message: 'Credential saved successfully' });
  } catch (error) {
    console.error('Error saving credential:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===🔓 Route to Decrypt Credential Password ===
form.post('/decrypt-password', async (req, res) => {
  try {
    const { id } = req.body;
    const credential = await Credential.findById(id);
    if (!credential) {
      return res.status(404).json({ error: 'Credential not found' });
    }

    const decryptedPassword = decrypt(credential.password);
    res.status(200).json({ password: decryptedPassword });
  } catch (error) {
    console.error('Decryption failed:', error);
    res.status(500).json({ error: 'Decryption failed' });
  }
});

// ===📥 Signup Route ===
form.post('/submit', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===🧠 Login Route ===
form.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: { name: foundUser.name, email: foundUser.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===📤 Fetch All Credentials ===
form.get('/credentials', async (req, res) => {
  try {
    const credentials = await Credential.find();
    res.status(200).json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===🧪 Test ===
form.get('/', (req, res) => {
  res.send("Welcome to the server");
});

form.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
