const mongoose = require('mongoose');
const Order = require("../orderModels/order");


const Schema = mongoose.Schema;

const applySchema = new Schema({
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    birthDate: {type: Date, required: true},
    order: {type: Schema.Types.ObjectId, ref: Order, required: true},
    state: {
        type: String, 
        required: true,
        enum: ['hct', 'halt', 'ipg', 'sent', 'pass', 'fail' ],
        // haven't contact, dừng, inprogress, đã gửi, đạt yêu cầu, không đạt yêu cầu
        default: "hct",
    }
})

applySchema.virtual('url').get(function() {
    return `/data/apply/${this.id}`;
})

module.exports = mongoose.model('Apply', applySchema); 