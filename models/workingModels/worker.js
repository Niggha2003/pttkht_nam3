const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = require("../orderModels/order") 
const AccountTraining = require("../accountModels/accountTraining");

const workerSchema = new Schema({
    isMarried : {type: 'boolean', required: true},
    isBanned : {type: 'boolean', required: true, default: false},
    accountTraining: {type: Schema.Types.ObjectId, ref: AccountTraining, required: true},
    order: {
        type: Schema.Types.ObjectId, 
        ref: Order,
        required: false,
    },
    timeGoAbroad: {type: Date},
    timeGoBack: {type: Date},
    efficiency: {
        type: [{
            type: Object,
            validate: {
                validator: function(obj) {
                    // Kiểm tra các key bắt buộc
                    return obj.hasOwnProperty('month') && obj.hasOwnProperty('offTimes') && obj.hasOwnProperty('attitude') && obj.hasOwnProperty('percentKPIReached');
                },
                message: `Mỗi giá trị 'năng xuất' phải có các key 'offTimes' và 'attitude' và 'percentKPIReached'.`
            }
        }], 
        default: [],
        required: true,
    },
    state: {
        type: String, 
        required: true,
        // đang đào tạo, chuẩn bị xuất cảnh, đã xuất cảnh, đã về nước
        enum: ["training", "prepared", "abroad" ,"back"],
        default: "training"
    },
})

workerSchema.virtual('url').get(function() {
    return `/data/worker/${this.id}`;
})

module.exports = mongoose.model('Worker', workerSchema); 