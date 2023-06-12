const adminRouter = require('./partnerportal/admin');
const prefitRouter = require('./partnerportal/prefit');
const RouteRouter = require('./partnerportal/route');
const ProductionTypeRouter = require('./partnerportal/productionType');
const DocumentRouter = require('./partnerportal/document');
const FirmwareRouter = require('./partnerportal/firmware');
const ProductRouter = require('./partnerportal/product');
const DocumentTypeRouter = require('./partnerportal/documentType');
const pMode0Router = require('./partnerportal/pMode0');
const pMode1Router = require('./partnerportal/pMode1');

module.exports = {
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
};
