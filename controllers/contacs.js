const mongodb = require('data/database');
const objectId = require('mongodb').ObjectId;
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to get contacts', error });
    });
}

const getSingle = async (req, res) => {
    const contactId = new objectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        if (contacts.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to get contact', error });
    });
}
module.exports = {
    getAll,
    getSingle
};