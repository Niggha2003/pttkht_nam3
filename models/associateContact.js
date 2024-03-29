const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const associateContactSchema = new Schema({
    name: {type: String, required: true},
    relation: {type: String, required: true},
    phoneNumber: {type: String, required: true}
});

associateContactSchema.virtual('url').get(function() {
    return `/data/associateContact/${this.id}`;
})

module.exports = mongoose.model('AssociateContact', associateContactSchema); 