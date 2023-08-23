/**
 * 
 * @param {*} success  資料庫連接成功的回調函數
 * @param {*} error    資料庫連接失敗的回調函數
 */


module.exports = function (success, error) {
    // 判斷 error 為其默認一個設定值
    if(typeof error !== "function"){
        error = () => {
            console.log('連接失敗~~~~');
        }
    }

    // 導入 mongoose
    const mongoose = require("mongoose");

    // 導入配置文件
    const {DB_HOST, DB_PORT, DB_NAME} = require("../config/config");

    // 連接 mongoDB
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);


    // 連接成功
    mongoose.connection.once('open', () => {
        success();
    });
    // 連接失敗
    mongoose.connection.on('error', () => {
        error();
    });

    // 連接關閉
    mongoose.connection.on('close', () => {
        console.log('連接關閉');
    });

}
