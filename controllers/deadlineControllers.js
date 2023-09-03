const Deadline = require("../models/Deadline")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors/MyErrors')

const getAllDeadlines = async (req,res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const {userId} = req.user
    const deadlines = await Deadline.find({
        deadlineDate: {
            $gte: today, // Match documents with a date greater than or equal to the current date
          },
        createdBy:userId
    })
    .sort(
        {
            deadlineDate : 1
        }
    )
    res.status(StatusCodes.OK).json({deadlines})
}

const getDeadlinesOfDate = async (req,res) => {
    const {userId} = req.user
    const date = req.date;
    const deadlines = await Deadline.find({eventDate:date,createdBy:userId});
    res.status(StatusCodes.OK).json({deadlines});
}

const createDeadline = async (req,res) => {
    const {userId} = req.user
    const {associatedTaskId} = req.body
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    const deadline = await Deadline.findOneAndUpdate({associatedTaskId:associatedTaskId},{...req.body,createdBy:userId},options);
    res.status(StatusCodes.OK).json({deadline});
}

const updateDeadline = async (req,res) => {
    const {date:DeadlineId} = req.params;
    const deadline = await Deadline.findOneAndUpdate({_id:DeadlineId},req.body,
        {new:true,runValidators:true});
    if(!deadline){
        throw new NotFoundError(`No task found with id ${DeadlineId}`)
    }
    res.status(StatusCodes.OK).json({deadline})
}

const deleteDeadline = async (req,res) => {
    const {id:DeadlineId} = req.params;
    const deadline = await Deadline.findOneAndDelete({_id:DeadlineId});
    if(!deadline){
        throw new NotFoundError(`No task found with id ${DeadlineId}`)
    }
    res.status(StatusCodes.OK).json({deadline})
}

module.exports = {
    getAllDeadlines,
    getDeadlinesOfDate,
    createDeadline,
    updateDeadline,
    deleteDeadline
}