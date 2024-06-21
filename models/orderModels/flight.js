const mongoose = require('mongoose');
const Worker = require("../workingModels/worker");

const Schema = mongoose.Schema;
const flightSchema = new Schema({
    airlineName: {type: String, required: true},
    flightNumber: {type: String, required: true},
    ticketClass: {
        type: String, 
        required: true,
        // vé hạng phổ thông, phổ thông đặc biệt, vé hạng thương gia, vé hạng nhất
        enum: ["economy", "premium", "business" ,"first"]
    },
    from: {type: String, required: true},
    to: {type: String, required: true},
    time: {type: Date, required: true},
    airlineGateway: {type: String, required: true},
    flightSeat: {type: String, required: true},
    worker: {type: Schema.Types.ObjectId, ref: Worker, required: true},
})

flightSchema.virtual('url').get(function() {
    return `/data/flight/${this.id}`;
})

module.exports = mongoose.model('Flight', flightSchema); 