const mongoose = require('mongoose');
const Worker = require("../workingModels/worker");
const AccountEmployee = require("../accountModels/accountEmployee");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    companyName: {type: String, required: true},
    companyAddress: {type: String, required: true},
    jobDescription: {type: String, required: true},
    quantityRequire: {
        type: Object,
        required: true,
        validate: {
            validator: function(obj) {
                return obj.hasOwnProperty('male') && obj.hasOwnProperty('female');
            },
            message: "Cần nhập cả giá trị cho nam và nữ"
        }
    },
    ageRequire: {type: Number, required: true},
    heightRequire: {
        type: Object,
        required: true,
        validate: {
            validator: function(obj) {
                return obj.hasOwnProperty('female') && obj.hasOwnProperty('male') 
            },
            message: "Cần nhập cả giá trị chiều cao và giới tính"
        }
    },
    weightRequire: {
        type: Object,
        required: true,
        validate: {
            validator: function(obj) {
                return obj.hasOwnProperty('female') && obj.hasOwnProperty('male') 
            },
            message: "Cần nhập cả giá trị cân nặng và giới tính"
        }
    },
    bodyRequire: {
        type: Object,
        required: true,
        validate: {
            validator: function(obj) {
                return  obj.hasOwnProperty('eyesight') && obj.hasOwnProperty('isSmoke') 
            },
            message: "Cần nhập các giá trị cơ thể đầy đủ"
        }
    },
    academicLevelRequire: {
        type: String, 
        required: true,
        // cơ sở, phổ thông, cao đẳng, đại học
        enum: ["cs", "pt", "cd" ,"dh"]
    },
    salary: {type: String, required: true},
    timeNeeded: {type: Date, required: true},
    state: {
        type: String, 
        required: true,
        enum: ["hap", "training", "ipg", "completed"],
        // haven't apply, đang đào tạo, inprogress, đã hoàn thành
        default: "hap",
    },
    type: {type: String, required: true},
    employee: {type: Schema.Types.ObjectId, ref: AccountEmployee, required: true},
    workers: {
        type: [{
            type: Schema.Types.ObjectId, 
            ref: Worker,
        }],
        required: true,
        default: []
    }
})

orderSchema.virtual('url').get(function() {
    return `/data/order/${this.id}`;
})

module.exports = mongoose.model('Order', orderSchema); 