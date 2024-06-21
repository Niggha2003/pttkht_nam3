var jwt = require('jsonwebtoken');
const secretKey = 'web_jwt_secret_key';
const express = require('express');
const router = express.Router();

const Account = require('../models/accountModels/account');
const connectCreate = require('../routes/connect');

const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

/// md5 hash ///
function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

// Route để tạo và trả về JWT
router.post('/', async (req, res) => {
    // Payload của JWT, có thể chứa thông tin người dùng, quyền hạn, vv.
    connectCreate.connect();

    const account = await Account.findOne({
        accountCode : req.body.accountName,
        password : md5Hash(req.body.accountPassword)
    }).populate('person').exec();

    if(account) {
        const payload = {
            accountCode: req.body.accountName,
            password: req.body.accountPassword,
            role: account.role,
            name: account.person.name,
            photo: account.person.photo,
        };
        // Tạo JWT bằng cách ký payload với secret key 
        jwt.sign(payload, secretKey, { expiresIn: Date.now() + 3600 }, (err, token) => {
            if (err) {
                console.error('Error creating JWT:', err);
                res.status(500).json({ error: 'Failed to create JWT' });
            } else {
                res.send(token);
            }
        });
    }else{
        res.send(false);
    }
    
});

module.exports = router;
  


  