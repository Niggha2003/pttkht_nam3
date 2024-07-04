const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');

router.get('/', (req, res, next) => {
    const getPath = require('path').join(__dirname, '../public', 'images', req.query.dirName);

    fs.readdir(getPath, (err, files) => {
        if (err) {
          return res.status(500).json({ error: 'Unable to scan directory' });
        }
        const imageUrls = files.map(file => `http://localhost:5000/images/${req.query.dirName}/${file}`);
        res.json(imageUrls);
      });
})

module.exports = router


