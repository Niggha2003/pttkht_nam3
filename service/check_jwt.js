var jwt = require('jsonwebtoken');
const secretKey = 'web_jwt_secret_key';

const asyncHandler = require("express-async-handler");


// xác thực jwt
const check_jwt = (role_need = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
          const token = authHeader.split(' ')[1];
      
          jwt.verify(token, secretKey, asyncHandler( async (err, user) => {
            if (err) {
              return res.sendStatus(403); // Không hợp lệ
            }
            if(role_need.length == 0) {
                return res.json({user })
              }
            if(role_need.includes(user.role)) {
                next();
            }else{
                return res.sendStatus(403); // Không hợp lệ
            }
          }));
        } else {
          res.sendStatus(401); // Không có token
        }
    };
}

module.exports = check_jwt;

    
