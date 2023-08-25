var express = require('express');
var router = express.Router();

// 註冊
router.get('/reg', (req,res) => {
    // 響應HTML
    res.render('auth/reg');
});

module.exports = router;
