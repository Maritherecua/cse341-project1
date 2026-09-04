const express = require('express');
const router = express.Router();

// Define route on the router instance
router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;