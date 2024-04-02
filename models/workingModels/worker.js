const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    isMarried : {type: 'boolean', required: true},
})

workerSchema.virtual('url').get(function() {
    return `/data/worker/${this.id}`;
})

module.exports = mongoose.model('Worker', workerSchema); 