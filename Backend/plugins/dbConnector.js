const mongoose = require("mongoose");
const { User } = require("../models/usersWithImport");
const { Category, Product, Tag } = require("../models/shop.js");
/* const appConfig = require("../config/appConfig");
const fp = require('fastify-plugin')

function dbConntector (fastify,options,done) {
    mongoose.connect(appConfig.dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(done())
        .catch((err) => console.log(err))
        
} */

const MONGOOSE_SETTINGS = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	/* useCreateIndex: true */
};
const models = { User, Category, Product, Tag };
async function fastifyMongoose(fastify, { uri, settings = {} }) {
	const mergedSettings = Object.assign({}, MONGOOSE_SETTINGS, settings);
	try {
		mongoose.connection.on("connected", () => {
			fastify.log.info({ actor: "Mongoose" }, "connected");
		});
		mongoose.connection.on("disconnected", () => {
			fastify.log.error({ actor: "Mongoose" }, "disconnected");
		});
		await mongoose.connect(uri, mergedSettings);

		/*     const decorator = { connection: mongoose.connection };
		 */
		fastify.addHook("onClose", (instance, done) => {
			instance.mongoose.connection.on("close", function () {
				fastify.log.info({ actor: "Mongoose" }, "Closed");
				done();
			});
			instance.mongoose.connection.close();
		});
		fastify.decorate("db", models);
	} catch (error) {
		fastify.log.error({ Actor: "Mongoose" }, "FastifyMongoose failed");
	}
}

module.exports = { fastifyMongoose };
