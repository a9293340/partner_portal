const models = require('./models');
const mongoose = require('mongoose');
//環境變數引入

// Reference

//  operator : https://www.mongodb.com/docs/manual/reference/operator/aggregation/
//  pipeline stages: https://www.mongodb.com/docs/v6.0/reference/operator/aggregation-pipeline/

//

require('dotenv').config();
const uri = `mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@cluster0.grmmhms.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
let db;
const MongooseCRUD = async (
	type,
	modelName,
	filters,
	options = {},
	projection = {}
) => {
	db = await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	//if type not remark "one" or "many" , transform type to "one".
	type = type === 'U' || type === 'D' ? `${type}o` : type;

	const model = mongoose.model(modelName, models[modelName], modelName);

	let promise;
	switch (type) {
		case 'C':
			promise = await model.insertMany(filters, { ordered: false });
			break;
		case 'R':
			//options : sort skip limit   projection: which you want to show
			promise = model.find(filters, projection, options).exec();
			break;
		case 'Uo':
			//options: target data projection: upsert (default is false)
			promise = await model
				.updateOne(filters, options, projection)
				.exec();
			break;
		case 'Um':
			//options: target data projection: upsert (default is false)
			promise = await model
				.updateMany(filters, options, projection)
				.exec();
			break;
		case 'Do':
			promise = await model.deleteOne(filters).exec();
			break;
		case 'Dm':
			promise = await model.deleteMany(filters).exec();
			break;
		case 'A':
			// filter : array ( pipeline )
			//  for example :
			// [
			//   {$match: { key : 'which data you want' }},
			//   {$group: {_id: "$ + key", total:{$sum : "$ + which you want to sum key"}}},
			//   {$sort: {targetKey : -1}}
			// ]
			promise = await model.aggregate(filters).exec();
			break;
		case 'COUNT':
			promise = await model.find(filters, projection, {}).count().exec();
			break;
	}
	return promise;
};

module.exports = {
	MongooseCRUD,
};
