var express = require('express');
var router = express.Router();

// 導入 moment
const moment = require("moment");
const AccountModel = require("../../models/AccountModels");

// 記帳本列表
router.get('/account', async (req, res) => {
  try {
    // 獲取資料庫所有帳單訊息,並按照時間做倒序排列
    const accounts = await AccountModel.find().sort({ time: -1 }).exec();

    // 響應讀取成功的json
    res.json({
        // 響應編號
        code: '0000',
        // 響應的訊息
        msg: '讀取成功',
        // 響應資料
        data: accounts
    });

  } catch (err) {
    res.json({
        code: '1001',
        msg: '讀取失敗',
        data: null
    });

    console.error(err);
    return;
  }
});

// 添加紀錄
router.get('/account/create', function(req, res) {
  res.render("create");
});

// 新增紀錄
router.post('/account', function(req, res) {
  
  // 查看表單數據  2023-09-01 => new Date()
  // 將 2023-09-01 透過 moment 工具包 轉成 new Date()
  // console.log(req.body);

  // 插入數據庫
  // 使用 async/await 處理 create 方法
  async function createBook() {
    try {
        const newBook = await AccountModel.create({
          // ES6 語法 將 req.body 內的資料全部插入
          ...req.body,
          // 修改 time 轉成 new Date()
          time: moment(req.body.time).toDate()
        });
         // 成功提醒
        res.render("success",{msg: "添加成功喔~~",url:"/account"});
    } catch (err) {
      res.status(500).send("插入失敗");
      console.error(err);
      return;
    }
  }
  createBook(); // 呼叫創建書籍的函數
});

// 刪除紀錄
router.get("/account/:id", async (req, res) => {
  // 獲取 param 的ID
  let id = req.params.id;
   
  try {
    // 刪除資料庫訊息
    const accounts = await AccountModel.deleteOne({ _id: id }).exec();

    // 刪除成功提醒
    res.render("success",{msg: "刪除成功喔~~",url:"/account"});
  } catch (err) {
    res.status(500).send("刪除失敗~~~");
    console.error(err);
    return;
  }
});

module.exports = router;
