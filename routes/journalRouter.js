const express = require('express')
const journalRouter = express.Router()
const {
    getAllEntries,
    getSingleEntry,
    createEntry,
    updateEntry,
    deleteEntry
} = require('../controllers/journalControllers')

journalRouter.route('/').get(getAllEntries).post(createEntry)
journalRouter.route('/:id').put(updateEntry).delete(deleteEntry).get(getSingleEntry)

module.exports = journalRouter