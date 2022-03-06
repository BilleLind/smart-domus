require("dotenv").config();
const Fastify = require("fastify");

const { fastifyMongoose } = require("./plugins/dbConnector.js");
const { userRoutes } = require("./routes/cookieUsers.js");

/* const { authRoutes } = require('./app.js') */
const closeWithGrace = require("close-with-grace");
const { shopRoutes } = require("./routes/shop.js");
const authStrategy = require("./plugins/auth.js");

const app = Fastify({
	logger: {
		prettyPrint: process.env.NODE_ENV === "development" ? true : false,
	},
	ignoreTrailingSlash: true,
	trustProxy: true,
});

/* app.register(authRoutes); */
app.register(fastifyMongoose, { uri: process.env.DBURI })
	.register(require("fastify-cors"), { origin: true, credentials: true })
	.register(authStrategy)
	.after(() => {
		app.register(userRoutes, { prefix: "/api" }).register(shopRoutes, {
			prefix: "/api",
		});
	});

const closeListeners = closeWithGrace(
	{ delay: 500 },
	async function ({ signal, err, manuel }) {
		if (err) {
			app.log.error(err);
		}
		await app.close();
	}
);

app.addHook("onClose", async (instance, done) => {
	closeListeners.uninstall();
	done();
});

app.listen(
	{
		port: process.env.PORT || 5000,
		host: process.env.NODE_ENV === "development" ? "127.0.0.1" : "0.0.0.0",
	},
	(err) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}
	}
);
