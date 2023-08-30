const express = require('express')
const calendarRouter = express.Router()
const extractDate = require('../middleware/dateExtractionMiddleware')

const {
    getAllDeadlines,
    getDeadlinesOfDate,
    createDeadline,
    updateDeadline,
    deleteDeadline
} = require('../controllers/deadlineControllers')

const {
    getAllEvents,
    getEventsOfDate,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventControllers')

// calendarRouter.use('/events/:date',extractDate)
// calendarRouter.use('/deadlines/:date',extractDate)

calendarRouter.route('/events').get(getAllEvents).post(createEvent)
calendarRouter.route('/events/:date').get(getEventsOfDate).put(updateEvent).delete(deleteEvent)

calendarRouter.route('/deadlines').get(getAllDeadlines).post(createDeadline)
calendarRouter.route('/deadlines/:date').get(getDeadlinesOfDate).put(updateDeadline).delete(deleteDeadline)

module.exports = calendarRouter