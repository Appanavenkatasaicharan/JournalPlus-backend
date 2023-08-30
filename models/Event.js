const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,'Must provide a title'],
        maxlength : [100,'Must not exceed 100 characters'],
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    eventDate : {
        type : Date,
        required : [true,'Must provide a date']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"please provide a user"]
    }
})

module.exports = mongoose.model('Event',EventSchema)