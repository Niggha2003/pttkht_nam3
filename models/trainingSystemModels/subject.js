const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
   name: {type: String, required: true},
   description: {type: String, required: true},
})

subjectSchema.virtual('url').get(function() {
    return `/data/subject/${this.id}`;
})

module.exports = mongoose.model('Subject', subjectSchema); 