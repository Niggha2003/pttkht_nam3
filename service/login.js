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
router.get('/', async (req, res) => {
    // Payload của JWT, có thể chứa thông tin người dùng, quyền hạn, vv.
    connectCreate.connect();

    const account = await Account.findOne({
        accountCode : req.query.accountName,
        password : md5Hash(req.query.accountPassword)
    }).exec();

    if(account) {
        const payload = {
            accountCode: req.query.accountName,
            password: req.query.accountPassword,
            role: account.role
        };
        // Tạo JWT bằng cách ký payload với secret key và add vào cookie
        jwt.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
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
  


  