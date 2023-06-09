const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {
	adminRouter,
	prefitRouter,
	RouteRouter,
	ProductionTypeRouter,
	DocumentRouter,
	FirmwareRouter,
	ProductRouter,
	DocumentTypeRouter,
	pMode0Router,
	pMode1Router,
} = require('./routes');
const { encryptRes } = require('./config/util/encryptNToken');
const { default: mongoose } = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '10240kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', adminRouter);
app.use('/api/prefit', prefitRouter);
app.use('/api/route', RouteRouter);
app.use('/api/productionType', ProductionTypeRouter);
app.use('/api/document', DocumentRouter);
app.use('/api/firmware', FirmwareRouter);
app.use('/api/product', ProductRouter);
app.use('/api/documentType', DocumentTypeRouter);
app.use('/api/p_mode_0', pMode0Router);
app.use('/api/p_mode_1', pMode1Router);

app.get('/', (req, res) => {
	res.sendfile('./views/index.html');
});

// development
app.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

// app.all('*', function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
// 	res.header(
// 		'Access-Control-Allow-Methods',
// 		'PUT, POST, GET, DELETE, OPTIONS'
// 	);
// 	next();
// });

// catch 404 and forward to error handleryar
app.use(function (req, res, next) {
	res.status(404).json({
		error_code: 10001,
		data: encryptRes({}),
	});
});

// error handler
app.use(function (err, req, res, next) {
	console.log('Error Code :', err);
	const error_code = Number.isInteger(err) ? err : 10003;
	res.status(500).json({ error_code, data: encryptRes({}) });
});

module.exports = app;
