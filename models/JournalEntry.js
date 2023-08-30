const mongoose = require('mongoose')
const moment = require('moment-timezone');

const EntrySchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,'Must provide a title'],
        maxlength : [100,'Must not exceed 100 characters'],
        trim : true
    },
    body : {
        type : String,
        trim : true
    },
    creationDate : {
        type : Date,
        default : Date.now,
        required : [true,'Must provide a date']
    },
    mood : {
        type : String,
        enum : ['NEUTRAL','SAD','HAPPY','DEPRESSED','EXCITED','ANXIOUS'],
        default : 'NEUTRAL'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"please provide a user"]
    }
})

EntrySchema.pre('save', function (next) {
    const indiaTime = moment.tz(this.date, 'Asia/Kolkata');
    this.date = indiaTime.utc();
    next();
  });

EntrySchema.post('init', function () {
    this.date = moment.utc(this.date).tz('Asia/Kolkata');
  })

module.exports = mongoose.model('JournalEntry',EntrySchema)