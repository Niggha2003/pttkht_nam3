const mongoose = require('mongoose')
const Account = require('./account')

const Schema = mongoose.Schema;

const AccountEmployeeSchema = new Schema({
    role: {
        type: String, 
        required: true,
        enum: ['training','signing','ordering','working','admin'],
    },
})

AccountEmployeeSchema.virtual('url').get(function() {
    return `/data/account/${this.id}`;
})

module.exports = Account.discriminator('account_employee', AccountEmployeeSchema)
