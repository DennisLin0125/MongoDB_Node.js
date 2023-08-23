// 導入mongoose
const mongoose = require('mongoose');

// 創建文檔結構
const MovieSchma = new mongoose.Schema({
    title: String,
    director: String
});

// 創建模型對象
const MovieModel = mongoose.model("movie", MovieSchma);

module.exports = MovieModel;