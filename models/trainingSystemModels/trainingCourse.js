const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingCourseSchema = new Schema({
   name: {type: String, required: true},
   description: {type: String, required: true},
   student: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "student",
    }],
    required: true,
    default: []
   },
   class: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "class",
    }],
    required: true,
    default: []
   }
})

trainingCourseSchema.virtual('url').get(function() {
    return `/data/trainingCourse/${this.id}`;
})

module.exports = mongoose.model('TrainingCourse', trainingCourseSchema); 