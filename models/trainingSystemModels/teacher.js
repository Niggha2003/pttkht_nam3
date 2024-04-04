const mongoose = require('mongoose');
const Subject = require("./subject")

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    accountTraining: {type: Schema.Types.ObjectId, ref: 'AccountTraining'},
    subjects: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: Subject,
        }],
        required: true,
        default: []
    }
})

teacherSchema.virtual('url').get(function() {
    return `/data/teacher/${this.id}`;
})

module.exports = mongoose.model('Teacher', teacherSchema); 