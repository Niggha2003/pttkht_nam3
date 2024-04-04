const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountCode: {type: String, required: true},
    password: {type: String, required: true},
})

accountSchema.virtual('url').get(function() {
    return `/data/account/${this.id}`;
})

module.exports = mongoose.model('Account', accountSchema); 