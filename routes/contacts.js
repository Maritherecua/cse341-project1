const express = require('express');
const router = express.Router();
//Import the contacts controller or database query
const contactsController = require('../controllers/contacts');

/**
 * @openapi
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         _id:
 *           type: string
 *           example: 6a9b975f4a1a63c12728e9a9
 *         firstName:
 *           type: string
 *           example: Maria
 *         lastName:
 *           type: string
 *           example: Arroyo
 *         email:
 *           type: string
 *           format: email
 *           example: maria@example.com
 *         favoriteColor:
 *           type: string
 *           example: green
 *         birthday:
 *           type: string
 *           format: date
 *           example: 1995-06-15
 */

// GET all contacts/root route
/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Unable to retrieve contacts
 */
router.get('/', contactsController.getAll);

// GET single contact by ID
/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - $ref: '#/components/parameters/ContactId'
 *     responses:
 *       200:
 *         description: The contact
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Invalid contact ID or server error
 */
router.get('/:id', contactsController.getSingle);
// POST create a new contact
/**
 * @openapi
 * /contacts:
 *   post:
 *     summary: Create a contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created
 *       500:
 *         description: Unable to create contact
 */
router.post('/', contactsController.create);

// PUT update a contact by ID
/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - $ref: '#/components/parameters/ContactId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Invalid contact ID or server error
 */
router.put('/:id', contactsController.update);

// DELETE a contact by ID
/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - $ref: '#/components/parameters/ContactId'
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Invalid contact ID or server error
 * components:
 *   parameters:
 *     ContactId:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *       example: 6a9b975f4a1a63c12728e9a9
 */
router.delete('/:id', contactsController.delete);

module.exports = router;