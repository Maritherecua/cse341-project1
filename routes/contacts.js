const express = require('express');
const router = express.Router();
//Import the contacts controller or database query
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactsController.getAllContacts);

// GET single contact by ID
router.get('/:id', contactsController.getContactById);

module.exports = router;