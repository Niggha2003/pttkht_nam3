const mongoose = require('mongoose');
const AccountEmployee = require("../accountModels/accountEmployee");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderCode: {type: String, required: true},
    orderName: {type: String, required: true},
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
    salary: {type: Number, required: true},
    timeNeeded: {type: Date, required: true},
    state: {
        type: String, 
        required: true,
        enum: ["hap", "training", "ipg", "completed"],
        // haven't apply, đang đào tạo, inprogress, đã hoàn thành
        default: "hap",
    },
    type: {
        type: String, 
        required: true,
        // cơ khí, dệt may, ô sin, bốc vác
        enum: ["ck", "dm", "os" ,"bv"]
    },
    employee: {type: Schema.Types.ObjectId, ref: AccountEmployee, required: true},
    paragraph: {type: String, default: ""},
    isHot: {type: Boolean, required: true, default: false},
    photo: {type: String, required: true}
})

orderSchema.virtual('url').get(function() {
    return `/data/order/${this.id}`;
})

module.exports = mongoose.model('Order', orderSchema); 