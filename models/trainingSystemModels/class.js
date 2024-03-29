const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
   name: {type: String, required: true},
   student: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "student",
    }],
    required: true,
   },
   timeStart: {type: Date, required: true},
   timeEnd: {type: Date, required: true},
   teacher: {type: Schema.Types.ObjectId, ref: "teacher", required: true},
   subject: {type: Schema.Types.ObjectId, ref: "subject", required: true},
   learningDoc: {
    type: [{
        type: Object,
        validate: {
            validator: function(obj) {
                // Kiểm tra các key bắt buộc
                return obj.hasOwnProperty('name') && obj.hasOwnProperty('author') && obj.hasOwnProperty('url');
            },
            message: `Mỗi giá trị 'Tài liệu' phải có các key 'name' và 'author' và 'url'.`
        }
    }]
   },
   mark: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "mark",
    }],
    required: true,
   }
})

classSchema.virtual('url').get(function() {
    return `/data/class/${this.id}`;
})

module.exports = mongoose.model('Class', classSchema); 