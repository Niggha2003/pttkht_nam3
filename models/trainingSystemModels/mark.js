const mongoose = require('mongoose');
const Student = require("./student");

const Schema = mongoose.Schema;

const markSchema = new Schema({
   middleMark: {type: Number, min: 0, max: 10},
   finalMark: {type: Number, min: 0, max: 10},
   student: {type: Schema.Types.ObjectId, ref: Student, required: true},
})

markSchema.virtual('url').get(function() {
    return `/data/mark/${this.id}`;
})

module.exports = mongoose.model('Mark', markSchema); 