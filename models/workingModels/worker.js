const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountTraining = require("../accountModels/accountTraining");

const workerSchema = new Schema({
    isMarried : {type: 'boolean', required: true},
    accountTraining: {type: Schema.Types.ObjectId, ref: AccountTraining, required: true},
})

workerSchema.virtual('url').get(function() {
    return `/data/worker/${this.id}`;
})

module.exports = mongoose.model('Worker', workerSchema); 