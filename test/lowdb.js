const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

// 獲取數據
// let ret = db.get("posts").find({id:1}).value()
// console.log(ret)

// Set some defaults
//db.defaults({ posts: [], user: {} }).write()

// 寫入數據
//db.get("posts").push({ id:2 ,title: "今天天氣還不錯~~"}).write()
//db.get("posts").unshift({ id:3 ,title: "今天天氣還不錯~~"}).write()


// 獲取數}據
//console.log(db.get("posts").value())

// 刪除數據
//let ret = db.get("posts").remove({id:2}).write(})
//console.log(ret)

// 更新數據
//db.get("posts").find({id:1}).assign({title:"今天下雨了~~"}).write()