const mongoose = require('mongoose')
const Account = require('./account')

const Schema = mongoose.Schema;

const roles = ['training','signing','ordering','working','admin']

const AccountEmployeeSchema = new Schema({
    role: {
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
              return roles.includes(v);
            },
            message: props => `${props.value} không hợp lệ. Chỉ chấp nhận giá trị thuộc vào ${roles}`
        }
    },
})

module.exports = Account.discriminator('account_employee', AccountEmployeeSchema)
