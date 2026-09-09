const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper function to read portfolio JSON data
const getPortfolioData = () => {
  const filePath = path.join(__dirname, 'data', 'portfolio.json');
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading portfolio.json:', err);
    return {};
  }
};

// Storage for submitted contact messages in memory
const contactSubmissions = [];

// Routes
// 1. Home page render
app.get('/', (req, res) => {
  const portfolioData = getPortfolioData();
  res.render('index', { portfolio: portfolioData });
});

// 2. API Portfolio JSON endpoint
app.get('/api/portfolio', (req, res) => {
  const portfolioData = getPortfolioData();
  res.json(portfolioData);
});

// 3. API Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Please enter your full name.'
    });
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Please enter your email address.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.'
    });
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a subject for your message.'
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Please enter your message.'
    });
  }

  // Save submission entry locally
  const newSubmission = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  contactSubmissions.push(newSubmission);
  console.log('New Contact Submission Received:', newSubmission);

  return res.status(200).json({
    success: true,
    message: `Thank you, ${name.trim()}! Your message has been received. Sapira will get back to you soon.`
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Sapira Portfolio Server is running on Port ${PORT}`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
