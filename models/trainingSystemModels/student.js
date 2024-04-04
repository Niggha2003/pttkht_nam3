const mongoose = require('mongoose');
const AccountTraining = require("../accountModels/accountTraining");
const Worker = require("../workingModels/worker");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    accountTraining: {type: Schema.Types.ObjectId, ref: AccountTraining},
    worker: {type: Schema.Types.ObjectId, ref: Worker, required: true},
})

studentSchema.virtual('url').get(function() {
    return `/data/student/${this.id}`;
})

module.exports = mongoose.model('Student', studentSchema); 