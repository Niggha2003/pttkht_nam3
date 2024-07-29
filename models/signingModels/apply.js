const mongoose = require('mongoose');
const Order = require("../orderModels/order");


const Schema = mongoose.Schema;

const applySchema = new Schema({
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    birthDate: {type: Date, required: true},
    order: {type: Schema.Types.ObjectId, ref: Order, required: true},
    createAt: {type: Date, default: new Date()},
    state: {
        type: String, 
        enum: ['hct', 'halt', 'ipg', 'sent', 'passed', 'failed' ],
        // haven't contact, dừng, đồng ý xuất khẩu và đang chuẩn bị hồ sơ, đã gửi hồ sơ, đạt yêu cầu, không đạt yêu cầu
        default: "hct",
    },
    portfolio: {type: String},
    timeModify: {type: Date}
})

applySchema.virtual('url').get(function() {
    return `/data/apply/${this.id}`;
})

module.exports = mongoose.model('Apply', applySchema); 