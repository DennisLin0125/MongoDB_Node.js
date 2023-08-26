// 檢測中間件登入
module.exports = (req ,res,next) => {
    //如果沒有登入
    if (!req.session.username) {
        return res.redirect('/login');
    }
    next();
}