const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    accountTraining: {type: Schema.Types.ObjectId, ref: 'accountTraining'},
    subjects: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'subject',
        }],
        required: true,
        default: []
    }
})

teacherSchema.virtual('url').get(function() {
    return `/data/teacher/${this.id}`;
})

module.exports = mongoose.model('Teacher', teacherSchema); 