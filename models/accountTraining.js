const mongoose = require('mongoose')
const Account = require('./account')

const Schema = mongoose.Schema;

const AccountTrainingSchema = new Schema({
    role: {
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
              return v === 'g' || v === 's';
            },
            message: props => `${props.value} không hợp lệ. Chỉ chấp nhận giá trị "g" hoặc "s".`
        }
    },
})

module.exports = Account.discriminator('account_training', AccountTrainingSchema)
