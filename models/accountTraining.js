const mongoose = require('mongoose')
const Account = require('./account')

const Schema = mongoose.Schema;

const AccountTrainingSchema = new Schema({
    accountCode: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('AccountTraining', AccountTrainingSchema)
