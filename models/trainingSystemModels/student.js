const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    accountTraining: {type: Schema.Types.ObjectId, ref: 'accountTraining'},
    worker: {type: Schema.Types.ObjectId, ref: 'worker', required: true},
})

studentSchema.virtual('url').get(function() {
    return `/data/student/${this.id}`;
})

module.exports = mongoose.model('Student', studentSchema); 