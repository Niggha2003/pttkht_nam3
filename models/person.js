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
    anotherCertificate: {type: Schema.Types.ObjectId, ref: "Certificate"},
    address: {type: String, required: true},
    associateContact:{type: Schema.Types.ObjectId, ref:"associateContact"},
    identifyCard: {type: String, required: true},
});

personSchema.virtual('url').get(function() {
    return `/data/person/${this.id}`;
})

module.exports = mongoose.model('Person', personSchema);