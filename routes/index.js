var express = require('express');
var router = express.Router();

// 導入lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);

// 導入 shortid
const shortid = require('shortid');

// 記帳本列表
router.get('/account', function(req, res) {
  // 獲取所有帳單訊息
  let accounts = db.get("accounts").value();
  res.render("list",{accounts:accounts});
});

// 添加紀錄
router.get('/account/create', function(req, res) {
  res.render("create");
});

// 新增紀錄
router.post('/account', function(req, res) {
  // 生成ID
  let id = shortid.generate();
  // 寫入文件
  db.get("accounts").unshift({id:id, ...req.body}).write();
  // 成功提醒
  res.render("success",{msg: "添加成功喔~~",url:"/account"});
});

// 刪除紀錄
router.get("/account/:id", function(req, res){
  // 獲取 param 的ID
  let id = req.params.id;
  // 刪除 
  db.get('accounts').remove({id:id}).write();
  // 響應
  res.render("success",{msg: "刪除成功喔~~",url:"/account"});
});

module.exports = router;
