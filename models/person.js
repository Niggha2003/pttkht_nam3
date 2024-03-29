const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    personInfo: {type: String, required: true},
    account: {type: Schema.Types.ObjectId, ref: "Account", required: true},
});

module.exports = mongoose.model('Person', personSchema);