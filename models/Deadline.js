const mongoose = require('mongoose')

const DeadlineSchema = new mongoose.Schema({
    deadlineDate : {
        type : Date,
        required : [true,'Must provide a date']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"please provide a user"]
    },
    associatedTaskId : {
        type:mongoose.Types.ObjectId,
        ref:'Task',
        required:[true,"please provide a task"]
    }
})

module.exports = mongoose.model('Deadline',DeadlineSchema)