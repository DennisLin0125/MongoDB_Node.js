// 導入 jwt
const jwt = require('jsonwebtoken');

// 宣告中間件
module.exports = (req,res,next) => {
    // 獲取 token
    let token = req.get('token');
    if (!token) {
      return res.json({
        code: "2003",
        msg: "token缺失",
        data: null
      })
    }
  
    // 校驗 token
    jwt.verify(token,'dennislin',(err,data) => {
      if (err) {
        return res.json({
          code: "2004",
          msg: "token 校驗失敗",
          data: null
        })
      }
    });
  
    // 如果成功
    next();
  }