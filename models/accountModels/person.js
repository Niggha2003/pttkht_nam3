const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {type: String, required: true},
    birthDate: {type: Date, required: true},
    photo: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    academicLevel: {
        type: String, 
        required: true,
        // cơ sở, phổ thông, cao đẳng, đại học
        enum: ["cs", "pt", "cd" ,"dh"]
    },
    anotherCertificates: {
        type: [{
            type: Object,
            validate: {
                validator: function(obj) {
                    // Kiểm tra các key bắt buộc
                    return obj.hasOwnProperty('certificateName') && obj.hasOwnProperty('level');
                },
                message: `Mỗi giá trị 'Chứng chỉ khác' phải có các key 'certificateName' và 'level'.`
            }
        }],
        default : [],
        required: true,
    },
    address: {type: String, required: true},
    associateContact: {
        type: Object, 
        required: true,
        validate: {
            validator: function(obj) {
                // Kiểm tra các key bắt buộc
                return obj.hasOwnProperty('name') && obj.hasOwnProperty('relation') && obj.hasOwnProperty('phoneNumber');
            },
            message: `Mỗi giá trị 'Người liên hệ' phải có các key 'name' và 'relation' và 'phoneNumber'.`
        }
    },
    identifyCard: {type: String, required: true},
    email: {type: String, required: true}
});

personSchema.virtual('url').get(function() {
    return `/data/person/${this.id}`;
})

module.exports = mongoose.model('Person', personSchema);