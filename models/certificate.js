const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    certificateName: {type: String, required: true},
    level: {type: String, required: true},
})

certificateSchema.virtual('url').get(function() {
    return `/data/certificate/${this.id}`;
})

module.exports = mongoose.model('Certificate', certificateSchema); 