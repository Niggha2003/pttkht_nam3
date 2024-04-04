const mongoose = require('mongoose');
const Student = require("./student");
const Teacher = require("./teacher");
const Subject = require("./subject");
const Mark = require("./mark");

const Schema = mongoose.Schema;

const trainingClassSchema = new Schema({
   name: {type: String, required: true},
   description: {type: String, required: true},
   students: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: Student,
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
   teacher: {type: Schema.Types.ObjectId, ref: Teacher, required: true},
   subject: {type: Schema.Types.ObjectId, ref: Subject, required: true},
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
        ref: Mark,
    }],
    required: true,
    default: []
   }
})

trainingClassSchema.virtual('url').get(function() {
    return `/data/trainingClass/${this.id}`;
})

module.exports = mongoose.model('TrainingClass', trainingClassSchema); 