// 導入mongoose
const mongoose = require('mongoose');
// 創建文檔的結構對象
const BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
});

// 創建模型物件 對文檔操作的物件
const BookModel = mongoose.model('books', BookSchema);

// 暴露模型物件
module.exports = BookModel;