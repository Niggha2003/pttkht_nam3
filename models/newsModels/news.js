const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    timeOutstandingRelease: {type: Date},
    pictureBase64: {type: String, required: true},
    type: {
        type: String, 
        required: true,
        // tiêu điểm, tin tức nổi bật
        enum: ["focal", "outstanding"]
    },
    focalTitle: {type: String},
    showOnHome: {type: Number},
    paragraph: {type: String, required: true},
    isForeignNews: {type: Boolean},
})

newsSchema.virtual('url').get(function() {
    return `/data/news/${this.id}`;
})

module.exports = mongoose.model('News', newsSchema); 