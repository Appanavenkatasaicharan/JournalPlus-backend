const JournalEntry = require('../models/JournalEntry')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors/MyErrors')

const getAllEntries = async (req,res) => {
    const {userId} = req.user
    const journals = await JournalEntry.find({createdBy:userId})
    res.status(StatusCodes.OK).json({journals})
}

const getSingleEntry = async (req,res)=>{
    const {id:JournalId} = req.params;
    const journal = await JournalEntry.findOne({_id:JournalId});
    if(!journal){
        throw new NotFoundError(`No task found with id ${JournalId}`)
    }
    res.status(StatusCodes.OK).json({journal});
}

const createEntry = async (req,res) => {
    const {userId} = req.user
    const journal = await JournalEntry.create({...req.body,createdBy:userId});
    res.status(StatusCodes.OK).json({journal});
}

const updateEntry = async (req,res) => {
    const {id:JournalId} = req.params;
    const journal = await JournalEntry.findOneAndUpdate({_id:JournalId},req.body,
        {new:true,runValidators:true});
    if(!journal){
        throw new NotFoundError(`No task found with id ${JournalId}`)
    }
    res.status(StatusCodes.OK).json({journal})
}

const deleteEntry = async (req,res) => {
    const {id:JournalId} = req.params;
    const journal = await JournalEntry.findOneAndDelete({_id:JournalId}); 
    if(!journal){
        throw new NotFoundError(`No task found with id ${JournalId}`)
    }
    res.status(StatusCodes.OK).json({journal})
}

module.exports = {
    getAllEntries,
    getSingleEntry,
    createEntry,
    updateEntry,
    deleteEntry
}