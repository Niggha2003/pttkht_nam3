const express = require('express')
const router = express.Router()
var path = require('path');

const multer = require('multer');


const uploadImage = (dirName, type = 'single') => {
    const uploadPath = require('path').join(__dirname, '../public', 'images', dirName);


    // Cấu hình storage cho multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadPath); // Thư mục lưu file upload
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file
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

router.post('/paragraph', uploadImage('paragraph'), (req, res, next) => {
    console.log(req.file, req.files)
    if(req.files){
      imageUrls = req.files.map(file => `http://localhost:5000/images/paragraph/${req.file.filename}`)
      res.json({imageUrls: imageUrls})
    }
    else if(req.file) {
      res.json({imageUrl: `http://localhost:5000/images/paragraph/${req.file.filename}`})
    }else{
      res.json({status: 500, message: "create image failed"})
    }
})

module.exports = router


