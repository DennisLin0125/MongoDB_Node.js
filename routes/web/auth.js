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
            const reg_userData = await UserModel.create({
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

// 登入頁面
router.get('/login', (req,res) => {
    // 響應HTML
    res.render('auth/login');
});

// 登入操作
router.post('/login', (req,res) => {
    // 獲取用戶名和密碼
    let {username ,password} = req.body;

    // 查詢數據庫
    async function findUser() {
        try {
            
            const userData = await UserModel.findOne({
                username: username,
                password: md5(password)
            });

            if (!userData) {
                return res.send('帳號或密碼錯誤');
            }
            
            // 寫入 session
            req.session.username = userData.username;
            req.session._id = userData._id;

            // 登入成功
            res.render("success",{msg: "登入成功喔~~",url:"/account"});

        } catch (err) {
            res.status(500).send("登入失敗");
            console.error(err);
            return;
        }
    }
    findUser(); // 呼叫創建書籍的函數
});


// 退出登入
router.get('/logout', (req,res) => {
    // 銷毀 session
    req.session.destroy(() => {
        // 退出成功響應
        res.render("success",{msg: "退出成功喔~~",url:"/login"});
    });
});

module.exports = router;
