const mongoose = require('mongoose');
const Student = require('./student');
const TrainingClass = require('./trainingClass');

const Schema = mongoose.Schema;

const trainingCourseSchema = new Schema({
   name: {type: String, required: true},
   description: {type: String, required: true},
   students: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: Student,
    }],
    required: true,
    default: []
   },
   trainingClasses: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: TrainingClass,
    }],
    required: true,
    default: []
   }
})

trainingCourseSchema.virtual('url').get(function() {
    return `/data/trainingCourse/${this.id}`;
})

module.exports = mongoose.model('TrainingCourse', trainingCourseSchema); 