const adminRouter = require('./partnerportal/admin');
const prefitRouter = require('./partnerportal/prefit');
const RouteRouter = require('./partnerportal/route');
const ProductionTypeRouter = require('./partnerportal/productionType');
const DocumentRouter = require('./partnerportal/document');
const FirmwareRouter = require('./partnerportal/firmware');
const ProductRouter = require('./partnerportal/product');
const DocumentTypeRouter = require('./partnerportal/documentType');

module.exports = {
	adminRouter,
	prefitRouter,
	RouteRouter,
	ProductionTypeRouter,
	DocumentRouter,
	FirmwareRouter,
	ProductRouter,
	DocumentTypeRouter,
};
