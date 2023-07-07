const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activitySchema = new Schema({
    title : String,
    description : String,
    hours : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model("activity",activitySchema);