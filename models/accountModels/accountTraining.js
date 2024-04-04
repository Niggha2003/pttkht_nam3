const mongoose = require('mongoose')
const Account = require('./account')
const Person = require('./person')

const Schema = mongoose.Schema;

const AccountTrainingSchema = new Schema({
    role: {
        type: String, 
        required: true,
        enum: ['student', 'teacher']
    },
    person: {type: Schema.Types.ObjectId, ref: Person, required: true},
})

AccountTrainingSchema.virtual('url').get(function() {
    return `/data/account/${this.id}`;
})

module.exports = Account.discriminator('Account_training', AccountTrainingSchema)
