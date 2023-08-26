const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/web/index');
const authRouter = require('./routes/web/auth');

// 導入 account api 的路由文件
const accountRoutes  = require('./routes/api/account');

// 引入 express-session connect-mongo
const session = require('express-session');
const MongoStore = require('connect-mongo');

// 導入 配置項
const {DB_HOST, DB_PORT, DB_NAME} = require('./config/config');

const app = express();

// 設置session中間件
app.use(session({
  name: "sid",    // 設置cookie的name,默認值是: connect.sid
  secret: "dennisLin",  // 參與加密的字串 (又稱簽名)
  saveUninitialized: false, // 是否為每次請求都設置一個cookie用來存session的id
  resave: true,  // 是否在每次請求時重新保存session
  store: MongoStore.create({
      mongoUrl: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`  //資料庫連接
  }),
  cookie: {
      httpOnly: true,  // 開啟後前端無法透過JS操作
      maxAge: 1000 * 60 * 60 * 24 * 7 //這一條 是控制 sessionID 的過期時間
  },
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);

// http://127.0.0.1:3000/api/account 即可訪問
app.use('/api',accountRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 響應 404
  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
