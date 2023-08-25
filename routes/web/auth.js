var express = require('express');
var router = express.Router();

// 導入加密模組
const md5 = require('md5');

// 導入用戶模型
const UserModel = require("../../models/UserModel");

// 註冊
router.get('/reg', (req,res) => {
    // 響應HTML
    res.render('auth/reg');
});

// 註冊用戶名
router.post('/reg', (req,res) => {

    async function createUser() {
        try {
            // 將帳號密碼存入DB
            const newBook = await UserModel.create({
                ...req.body,
                // 將密碼進行加密
                password: md5(req.body.password)
            });
            // 成功提醒
            res.render("success",{msg: "註冊成功喔~~",url:"/login"});
        } catch (err) {
            res.status(500).send("註冊失敗,請稍後再試");
            console.error(err);
            return;
        }
    }
    createUser(); // 呼叫創建書籍的函數
});


module.exports = router;
