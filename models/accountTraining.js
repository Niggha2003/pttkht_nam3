const mongoose = require('mongoose')
const Account = require('./account')

const Schema = mongoose.Schema;

const AccountTrainingSchema = new Schema({
    role: {
        type: String, 
        required: true,
        enum: ['s', 't']
    },
})

module.exports = Account.discriminator('account_training', AccountTrainingSchema)
