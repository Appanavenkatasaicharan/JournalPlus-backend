const Event = require('../models/Event')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors/MyErrors')


const getAllEvents = async (req,res) => {
    const {userId} = req.user
    const events = await Event.find({createdBy:userId})
    res.status(StatusCodes.OK).json({events})
}

const getEventsOfDate = async (req,res) => {
    const {userId} = req.user
    // const date = req.date;
    const {date} = req.params;
    const events = await Event.find({eventDate:date,createdBy:userId});
    res.status(StatusCodes.OK).json({events});
}

const createEvent = async (req,res) => {
    const {userId} = req.user
    const event = await Event.create({...req.body,createdBy:userId});
    res.status(StatusCodes.OK).json({event});
}

const updateEvent = async (req,res) => {
    const {date:EventId} = req.params;
    const event = await Event.findOneAndUpdate({_id:EventId},req.body,
        {new:true,runValidators:true});
    if(!event){
        throw new NotFoundError(`No task found with id ${EventId}`)
    }
    res.status(StatusCodes.OK).json({event})
}

const deleteEvent = async (req,res) => {
    const {date:EventId} = req.params;
    const event = await Event.findOneAndDelete({_id:EventId});
    if(!event){
        throw new NotFoundError(`No task found with id ${EventId}`)
    }
    res.status(StatusCodes.OK).json({event})
}

module.exports = {
    getAllEvents,
    getEventsOfDate,
    createEvent,
    updateEvent,
    deleteEvent
}