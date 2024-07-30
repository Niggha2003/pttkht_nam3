const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    // những cái nào là tiêu điểm sẽ k có thời gian
    timeOutstandingRelease: {type: Date},
    pictureBase64: {type: String, required: true},
    type: {
        type: String, 
        required: true,
        // tiêu điểm, tin tức nổi bật
        enum: ["focal", "outstanding"]
    },
    // những cái nào là outstanding sẽ k có focalTitle
    focalTitle: {type: String},
    // show on Home bằng 4 hoặc null thì là k được show, 0 là show với foreign và focal, còn 0,1,2 là show với outstanding
    showOnHome: {type: Number},
    paragraph: {type: String, default: "Chưa có đoạn văn cho tin tức"},
    isForeignNews: {type: Boolean},
    timeRelease: {type: Date, default: new Date()}
})

newsSchema.virtual('url').get(function() {
    return `/data/news/${this.id}`;
})

module.exports = mongoose.model('News', newsSchema); 