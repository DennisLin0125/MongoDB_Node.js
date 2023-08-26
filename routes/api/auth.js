const express = require('express');
const router = express.Router();
// 導入 jwt
const jwt = require('jsonwebtoken');

// 導入加密模組
const md5 = require('md5');

// 導入用戶模型
const UserModel = require("../../models/UserModel");


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
                return res.json({
                    code: "2002",
                    msg: "帳號或密碼錯誤",
                    data: null
                });
            }

            // 創建當前用戶 token
            let token = jwt.sign({
                username: username,
                _id: userData._id
            },'dennislin',{
                expiresIn: 60 * 60 * 24 * 7
            });

            // 響應token
            res.json({
                code: "0000",
                msg: "登入成功",
                data: token
            });

        } catch (err) {
            res.json({
                code: "2001",
                msg: "資料庫讀取失敗",
                data: null
            });
            console.error(err);
            return;
        }
    }
    findUser(); // 呼叫函數
});


// 退出登入
router.post('/logout', (req,res) => {
    // 銷毀 session
    req.session.destroy(() => {
        // 退出成功響應
        res.render("success",{msg: "退出成功喔~~",url:"/login"});
    });
});

module.exports = router;
