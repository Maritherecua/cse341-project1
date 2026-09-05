const express = require('express');
const router = express.Router();
const contactsRoutes = require('./contacts');

// Define route on the router instance
router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.use('/contacts', contactsRoutes);

module.exports = router;