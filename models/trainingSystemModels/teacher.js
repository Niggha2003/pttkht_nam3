const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    class: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'class'
        }],
        required: true,
    },
    accountTraining: {type: Schema.Types.ObjectId, ref: 'accountTraining'},
    subject: {type: String, required: true},
})

teacherSchema.virtual('url').get(function() {
    return `/data/teacher/${this.id}`;
})

module.exports = mongoose.model('Teacher', teacherSchema); 