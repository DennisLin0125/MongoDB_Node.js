// 導入mongoose
const mongoose = require('mongoose');
// 創建文檔的結構對象
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// 創建模型物件 對文檔操作的物件
const UserModel = mongoose.model('users', UserSchema);

// 暴露模型物件
module.exports = UserModel;