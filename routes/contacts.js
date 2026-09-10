const express = require('express');
const router = express.Router();
//Import the contacts controller or database query
const contactsController = require('../controllers/contacts');

// GET all contacts/root route
router.get('/', contactsController.getAll);

// GET single contact by ID
router.get('/:id', contactsController.getSingle);
// POST create a new contact
router.post('/', contactsController.create);

// PUT update a contact by ID
router.put('/:id', contactsController.update);

// DELETE a contact by ID
router.delete('/:id', contactsController.delete);

module.exports = router;