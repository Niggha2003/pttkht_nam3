const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    trainingCourse: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'trainingCourse'
        }],
        required: true,
    },
    accountTraining: {type: Schema.Types.ObjectId, ref: 'accountTraining'}
})

studentSchema.virtual('url').get(function() {
    return `/data/student/${this.id}`;
})

module.exports = mongoose.model('Student', studentSchema); 