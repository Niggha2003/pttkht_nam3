const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const learningDocSchema = new Schema({
    name: {type: String, required: true},
    path: {type: String, required: true}
});

learningDocSchema.virtual('url').get(function() {
    return `/data/learningDoc/${this.id}`;
})

module.exports = mongoose.model('LearningDoc', learningDocSchema); 
