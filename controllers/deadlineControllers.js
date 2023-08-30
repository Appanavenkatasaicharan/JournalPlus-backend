const Deadline = require("../models/Deadline")

const getAllDeadlines = async (req,res) => {
    const {userId} = req.user
    const deadlines = await Deadline.find({createdBy:userId})
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
    const deadline = await Deadline.create({...req.body,createdBy:userId});
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
    const {date:DeadlineId} = req.params;
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