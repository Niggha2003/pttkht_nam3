const mongoose = require('mongoose')
const Account = require('./account')

const Schema = mongoose.Schema;

const AccountTrainingSchema = new Schema({
    role: {
        type: String, 
        required: true,
        enum: ['student', 'teacher']
    },
})

AccountTrainingSchema.virtual('url').get(function() {
    return `/data/account/${this.id}`;
})

module.exports = Account.discriminator('account_training', AccountTrainingSchema)
