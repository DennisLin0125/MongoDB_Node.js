// 導入mongoose
const mongoose = require('mongoose');
// 創建文檔的結構對象
const AccountSchema = new mongoose.Schema({
    // 標題
    title: {
        type: String,
        required: true
    },
    // 時間
    time: Date,
    // 類型
    type: {
        type: Number,
        default: -1
    },
    // 金額
    account: {
        type: Number,
        required: true
    },
    // 備註
    remarks: {
        type: String
    }
});

// 創建模型物件 對文檔操作的物件
const AccountModel = mongoose.model('accounts', AccountSchema);

// 暴露模型物件
module.exports = AccountModel;