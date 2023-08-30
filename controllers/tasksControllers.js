const { StatusCodes } = require('http-status-codes')
const Task = require('../models/Task')
const {NotFoundError} = require('../errors/MyErrors')

const getAllTasks = async (req,res)=> {
    const {userId} = req.user
    const tasks = await Task.find({createdBy:userId})
    res.status(StatusCodes.OK).json({tasks})
}

const createTask = async (req,res)=>{
    const {userId} = req.user
    const task = await Task.create({...req.body,createdBy:userId});
    res.status(StatusCodes.OK).json({task});    
}

const updateTask = async (req,res)=>{
    const {id:taskId} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskId},req.body,
        {new:true,runValidators:true});
    if(!task){
        throw new NotFoundError(`No task found with id ${taskId}`)
    }
    res.status(StatusCodes.OK).json({task})
}

const deleteTask = async (req,res)=>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID}); 
    if(!task){
        throw new NotFoundError(`No task found with id ${taskId}`)
    }
     res.status(StatusCodes.OK).json({task})
}

module.exports = { 
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}