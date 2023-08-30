const mongoose = require('mongoose');

// We provide an object to an attribute in our schema to specify our validation.

const TaskSchema = new mongoose.Schema({
    body : {
        type : String,
        required : [true,'Must provide a name'],
        maxlength : [50,'Must not exceed 50 characters'],
        trim : true
    },
    completed : {
        type : Boolean,
        required : true,
        default : false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"please provide a user"]
    }
})

module.exports = mongoose.model('Task',TaskSchema);