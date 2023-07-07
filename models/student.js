const mongoose = require('mongoose');
const activity = require('./activity');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    UID : Number,
    name : String,
    totalhours : {
        type:Number,
        default : 0
    },
    activities : [{
        type: Schema.Types.ObjectId,
        ref:'activity'
    }]
});

module.exports = mongoose.model('student',studentSchema);