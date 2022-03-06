const fastifyAuth = require("fastify-auth");
const fp = require("fastify-plugin");
const User = require("../models/usersWithImport");


module.exports = fp(async function (fastify) {
	fastify
		.decorate("asyncVerifyJWT", async (req, reply) => {
			try {
				await req.jwtVerify();

			} catch (error) {
				reply.code(401).send({ error: "Manglende token" });
				return Promise.reject(new Error("Manglende Token"));
			}
		})
		.decorate("asyncValidate", async (req, reply) => {
			/* 
                check the cookie and/or header
                get the token from cookie or header
                user.findByToken
                set req.user = user
            */
			let token;

			if (!req.headers.authorization && !req.cookies) {
				reply.code(401).send({ error: "Manglende token" });
				return Promise.reject(new Error("Manglende Token"));
			} else if (req.headers.authorization) {
				fastify.log.info("authorization");
				token = req.headers.authorization.split(" ")[1];
				if (token === undefined) {
					token = req.headers.authorization;
				}
			} else if (req.cookies && req.cookies != null) {
				fastify.log.info("cookies");
				token = req.cookies;
				fastify.log.info({ actor: "req.cookies" }, token);
			}

			const user = await User.findByToken(token, fastify);
			if (!user) {
				reply.code(401).send({ error: "Authentikation fejlede" });
				return Promise.reject(new Error("Authentikation fejlede"));
			}
			req.user = user;
		})
		.decorate("asyncVerifyEmailAndPassword", async (req, reply) => {
			try {
				if (!req.body) {
					return Promise.reject(
						new Error("Email og Password mangler!")
					);
				}
				const user = await User.findByCrendentials(
					req.body.email,
					req.body.password
				);
				req.user = user;
			} catch (error) {
				reply.code(401).send(error);
			}
		})
		.register(fastifyAuth)
		.register(require("fastify-jwt"), {
			secret: process.env.JWT_SECRET,
			cookie: { cookieName: "token", signed: false },
		})
		.register(require("fastify-cookie"));
});