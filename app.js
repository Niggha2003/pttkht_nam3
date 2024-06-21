var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const indexRouter = require('./routes/index');
const service = require('./service')

var app = express();

// Tăng giới hạn tải lên lên 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Cấu hình middleware CORS
const corsOptions = {
  origin: 'http://localhost:5000', // Chỉ định nguồn gốc chính xác của yêu cầu
  // credentials: true, // Cho phép sử dụng thông tin xác thực (credentials)
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/working", indexRouter.workingRoutes);
app.use("/api/trainingSystem", indexRouter.trainingSystemRoutes);
app.use("/api/signing", indexRouter.signingRoutes);
app.use("/api/order",  indexRouter.orderRoutes);
app.use("/api/account",  indexRouter.accountRoutes);

app.use('/api/api_login', service.login)
app.use('/api/api_check_jwt', service.check_jwt());

app.use('/', createProxyMiddleware({ 
  target: 'http://localhost:5173', // FE server port
  changeOrigin: true,
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(5000)

module.exports = app;
