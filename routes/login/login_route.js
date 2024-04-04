var jwt = require('jsonwebtoken');
const secretKey = 'testToken';


// Route để tạo và trả về JWT
app.post('/login', (req, res) => {
    // Payload của JWT, có thể chứa thông tin người dùng, quyền hạn, vv.
    const payload = {
        user_id: req.query.user_id,
        username: req.query.user_name
    };
  
    // Tạo JWT bằng cách ký payload với secret key
    jwt.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            console.error('Error creating JWT:', err);
            res.status(500).json({ error: 'Failed to create JWT' });
        } else {
            // Trả về JWT cho client
            res.set('authorization', `Bearer ${token}`);
            res.json({token});
        }
    });
  });
  
  
// test verify token
app.get('/test', (req, res) => {
// Token nhận được từ client
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIxMjMiLCJ1c2VybmFtZSI6Im5naGlhIiwiaWF0IjoxNzEyMjIxODk0LCJleHAiOjE3MTIyMjU0OTR9.kpcMCQIrWpLvHCJYzdgVAc3zRaYCtUGwqAdk9d6g_GA';

// Parse token và trích xuất thông tin từ token
jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.error('Error parsing JWT:', err);
        // Xử lý lỗi khi không thể parse token
    } else {
        res.json({decoded});
        // decoded chứa các thông tin được trích xuất từ token
        // Ví dụ: decoded.user_id, decoded.username, vv.
}});
})
  