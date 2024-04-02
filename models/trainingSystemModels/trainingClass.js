const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingClassSchema = new Schema({
   name: {type: String, required: true},
   description: {type: String, required: true},
   students: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "student",
    }],
    required: true,
    default: []
   },
   dayOfWeek: {type: Number, required: true},
   dayStart: {type: Date, required: true},
   dayEnd: {type: Date, required: true},
   timeStart: {
    type: Object,
    required: true,
    validate: {
        validator: function(obj) {
            // Kiểm tra các key bắt buộc
            return obj.hasOwnProperty('hour') && obj.hasOwnProperty('minute') && obj.hasOwnProperty('TOD');
        }
    }
   },
   timeEnd: {
    type: Object,
    required: true,
    validate: {
        validator: function(obj) {
            // Kiểm tra các key bắt buộc
            return obj.hasOwnProperty('hour') && obj.hasOwnProperty('minute') && obj.hasOwnProperty('TOD');
        }
    }
   },
   teacher: {type: Schema.Types.ObjectId, ref: "teacher", required: true},
   subject: {type: Schema.Types.ObjectId, ref: "subject", required: true},
   learningDocs: {
    type: [{
        type: Object,
        validate: {
            validator: function(obj) {
                // Kiểm tra các key bắt buộc
                return obj.hasOwnProperty('name') && obj.hasOwnProperty('author') && obj.hasOwnProperty('url');
            },
            message: `Mỗi giá trị 'Tài liệu' phải có các key 'name' và 'author' và 'url'.`
        }
    }],
    required: true,
    default: []
   },
   marks: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "mark",
    }],
    required: true,
    default: []
   }
})

trainingClassSchema.virtual('url').get(function() {
    return `/data/trainingClass/${this.id}`;
})

module.exports = mongoose.model('TrainingClass', trainingClassSchema); 