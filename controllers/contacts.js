const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const create = async (req, res) => {
    try {
        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const result = await mongodb.getDatabase().collection('Contacts').insertOne(newContact);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create contact', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);
        const updatedContact = req.body;
        const result = await mongodb.getDatabase().collection('Contacts').updateOne(
            { _id: contactId },
            { $set: updatedContact }
        );
        if (result.matchedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update contact', error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);
        const result = await mongodb.getDatabase().collection('Contacts').deleteOne({ _id: contactId });
        if (result.deletedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete contact', error: error.message });
    }
};

const getAll = async (req, res) => {
    try{
        //Query contacts collection on Project1 database
        const result = await mongodb.getDatabase().collection('Contacts').find();
        const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
        } catch(error) {
            res.status(500).json({ message: 'Failed to get contacts', error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
    const contactId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().collection('Contacts').find({ _id: contactId });
    const contacts = await result.toArray();
        if (contacts.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to get contact', error: error.message });
    }
};  

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    delete: deleteContact
};