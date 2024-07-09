const { error } = require('console');
const express = require('express')
const router = express.Router()

const fs = require('fs');
const path = require('path');

router.get('/', (req, res, next) => {
    // Đường dẫn tới file cần đọc
    const filePath = path.join(__dirname,'../public', 'jsons' , 'infoCompany.json');

    // Đọc nội dung file
    fs.readFile(filePath, 'utf8', (err, infoCompany) => {
    if (err) {
        res.json({error: err } )
        return;
    }
    try {
        // Chuyển đổi chuỗi JSON thành object
        const parsedData = JSON.parse(infoCompany);
        res.json(parsedData)
    } catch (err) {
        res.json({error: err } )
    }
    });

})

router.post('/', (req, res, next) => {
    // Chuyển đổi object thành chuỗi JSON
    const jsonData = JSON.stringify(req.body.infoCompany, null, 2);

    // Đường dẫn tới file cần ghi
    const filePath = path.join(__dirname,'../public', 'jsons' , 'infoCompany.json');

    // Ghi chuỗi JSON vào file
    fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
        res.json({error: err } )
    } else {
        res.json({status: 200 } )
    }
    });
})

module.exports = router;

