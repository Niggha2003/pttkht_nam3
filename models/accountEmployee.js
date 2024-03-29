const mongoose = require('mongoose')
const Account = require('./account')

const Schema = mongoose.Schema;

const roles = ['training','signing','ordering','working','admin']

const AccountEmployeeSchema = new Schema({
    role: {
        type: String, 
        required: true,
        enum: ['training','signing','ordering','working','admin'],
    },
})

module.exports = Account.discriminator('account_employee', AccountEmployeeSchema)
