const mongoose = require('mongoose')
const Account = require('./account')
const Person = require('./person')

const Schema = mongoose.Schema;

const AccountEmployeeSchema = new Schema({
    role: {
        type: String, 
        required: true,
        enum: ['training','signing','ordering','working','admin'],
    },
    person: {type: Schema.Types.ObjectId, ref: Person, required: true},
})

AccountEmployeeSchema.virtual('url').get(function() {
    return `/data/account/${this.id}`;
})

module.exports = Account.discriminator('Account_employee', AccountEmployeeSchema)
