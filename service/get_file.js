const express = require('express')
const router = express.Router()
const path = require('path');

const multer = require('multer');


router.get('/', (req, res, next) => {
    const getPath = path.join(__dirname, '../private', req.query.dirName);

    res.sendFile(path.join(getPath, req.query.fileName));
})

const uploadFile = (dirName, fileName, type = 'single') => {
    const uploadPath = require('path').join(__dirname, '../private', dirName);

    // Cấu hình storage cho multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, uploadPath); // Thư mục lưu file upload
        },
        filename: (req, file, cb) => {
        cb(null, fileName + path.extname(file.originalname)); // Đặt tên file
        }
    });

    // Khởi tạo multer với cấu hình storage
    const upload = multer({ storage: storage });

    if(type == 'single') {
        return upload.single('file')
    }else{
        return upload.array('files', 10) 
    }
}

router.post('/', (req, res, next) => {
    const uploadMiddleware = uploadFile(req.query.dirName, req.query.fileName)
    // Gọi middleware tải tệp
    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ status: 200 });
    });
})

module.exports = router


