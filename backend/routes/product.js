// 第三方套件
const express = require('express');
const path = require('path');

// 自己建立的module 
let rootPath = path.resolve(__dirname,'..');//取得上一層路徑位置 


const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(rootPath, 'dist', 'index.html'));
});

module.exports = router;