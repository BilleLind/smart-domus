const User = require("../models/usersWithImport");

/* 
    Dependencies=>
    mongoose, fastify-jwt, fastify-auth, fastify-cookie, dbConnector (own mongoose connection with models decoration)

    decorate fastify with the verifycation for JWT and email/password
    save JWT to Cookie therefore check cookie and headers
        findByToken need to verify it's age and remove it => error

    JWT content => userid, role

    after add CSRF to the cookie
*/

const userRoutes = async (fastify, opts) => {
	/* Routes */
	fastify.route({
		method: ["POST", "HEAD"],
		url: "/auth/signup",
		logLevel: "warn",
		handler: async (req, reply) => {
			/* const user = new User({email: req.body.email, password: req.body.password, role: req.body.role}) */
			const user = new User(req.body);
			try {
				await user.save();
				const token = await user.generateToken(fastify);
				reply.setCookie("token", token, {
						domain: "*",
						path: "/",
						/* secure: true,
						httpOnly: true,
						sameSite: true, */
						maxAge: 60 * 60,
					})
					.code(200)
					.send({ status: "success" });
			} catch (error) {
				fastify.log.error("Signup error");
				reply.status(400).send(error);
			}
		},
	});

	fastify.route({
		method: ["GET", "HEAD"],
		url: "/auth/cookie",
		logLevel: "warn",
		preHandler: async (req, reply) => {
			await req.jwtVerify();
		},
		handler: async (req, reply) => {
			try {
				reply.send({ token: "OK", message: "Success" });
				/* after being verified then do the user verifikation => fastify.auth([fastify.asyncVerifyJWT]), */
			} catch (error) {
				reply.send(error);
			}
		},
	});

	fastify.route({
		method: ["GET", "HEAD"],
		url: "/auth/dashboard",
		logLevel: "warn",
		preHandler: fastify.auth([fastify.asyncVerifyJWT]),
		handler: async (req, reply) => {
			reply.send({ isAuthenticated: true, user: req.user });
		},
	});
};

module.exports = { userRoutes };
