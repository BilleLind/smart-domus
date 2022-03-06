const { default: fastifyAuth } = require("fastify-auth");

const { Category, Product, Tag } = require("../models/shop.js");
/* 
	(klima, belysning, osv.)
	Kategorie{
		Products => 
			Title, CardImage, Images[], Describtion, 
			quantity, price, Tags, 
			rabat, 
			specification: (sikker flere, #each from under spec)
				producent, vare nr, EAN nr, farve, 
		}
*/

const shopRoutes = async (fastify, opts) => {
	/* Landing/forside */
	fastify.get("/", async (req, reply) => {
		reply.send({
			slides: [
				{
					src: "https://picsum.photos/900/600?random=1",
					alt: "first image",
					link: "https://google.com",
				},
				{
					src: "https://picsum.photos/900/600?random=2",
					alt: "second image",
					link: "https://google.com",
				},
				{
					src: "https://picsum.photos/900/600?random=3",
					alt: "third image",
					link: "https://google.com",
				},
			],
			section: {
				first: {
					bigCard: {
						img: "https://picsum.photos/600/600?random=1",
						alt: "Big Card 1 alt tag",
						link: "/wups",
						header: "Header Text",
						headerClass: "bottom-[10%] right-[10%]",
					},
					cards: [
						{ header: "Hubs", svg: "hubs", link: "/" },
						{
							header: "Kilma Enheder",
							svg: "temperature",
							link: "/",
						},
						{ header: "Belysning", svg: "bulb", link: "/" },
						{ header: "Sikkerhed", svg: "alarm", link: "/" },
					],
				},
				second: {
					bigCard: {
						img: "https://picsum.photos/600/600?random=2",
						alt: "Big Card 2 alt tag",
						link: "/wups2",
						header: "Header Text",
						headerClass: "bottom-[10%] left-[10%]",
					},
					cards: [
						{ header: "Indgang", svg: "doorbell", link: "/" },
						{ header: "Planter", svg: "plants", link: "/" },
						{ header: "Rengøring", svg: "cleaning", link: "/" },
						{ header: "Opvask", svg: "washer", link: "/" },
					],
				},
			},
		});
	});

	/* Get all categoris */
	fastify.get("/shop/kategories", async (req, reply) => {
		try {
			const categories = await Category.find({});
			reply.send({ categories });
		} catch (error) {
			reply.send({ error });
		}
	});

	/* 
		Get Multiple categories 
		=>	Accepts array with strings
	*/
	fastify.post("/shop/kategories/flere", async (req, reply) => {
		try {
			const categories = await Category.find({ name: req.body });
			reply.send({ categories });
		} catch (error) {
			reply.send(error);
		}
	});

	/* Get Categorie */
	fastify.get("/shop/kategories/:kategorie", async (req, reply) => {
		try {
			const categorie = await Category.findOne(req.params);
			reply.send(categorie);
		} catch (error) {
			reply.send({ error });
		}
	});

	/* Get all Tags */
	fastify.get("/shop/tags", async (req, reply) => {
		try {
			const tags = await Tag.find({});
			reply.send(tags);
		} catch (error) {
			reply.send({ error });
		}
	});
	/* 
		Get Multiple Tags 
		=>	Accepts array with strings
	*/
	fastify.post("/shop/Tags/flere", async (req, reply) => {
		try {
			const tags = await Tag.find({ name: req.body });
			reply.send({ tags });
		} catch (error) {
			reply.send(error);
		}
	});

	/* Get Tag */
	fastify.get("/shop/tags/:tag", async (req, reply) => {
		try {
			const tag = await Tag.findOne(req.params);
			reply.send(tag);
		} catch (error) {
			reply.send({ error });
		}
	});

	/* Save Kategorie */
	fastify.route({
		method: ["POST", "HEAD"],
		url: "/shop/kategorie",
		logLevel: "warn",
		preValidation: fastify.auth([fastify.asyncVerifyJWT]),
		preHandler: fastify.auth([fastify.asyncValidate]),
		handler: async (req, reply) => {
			try {
				const kategorie = new Category(req.body);
				kategorie.save(function (error) {
					if (error) return error;
				});
				reply.code(200).send({ category: category, Succes: true });
			} catch (error) {
				reply.code(401).send({ error: error, Succes: false });
			}
		},
	});

	/* Save Tag */
	fastify.route({
		method: ["POST", "HEAD"],
		url: "/shop/tag",
		logLevel: "warn",
		preValidation: fastify.auth([fastify.asyncVerifyJWT]),
		preHandler: fastify.auth([fastify.asyncValidate]),
		handler: async (req, reply) => {
			try {
				const tag = new Tag(req.body);
				tag.save(function (error) {
					if (error) return error;
				});
				reply.code(200).send({ tag: tag, Succes: true });
			} catch (error) {
				reply.code(401).send({ error: error, Succes: false });
			}
		},
	});

	/* Save Product */
	fastify.route({
		method: ["POST", "HEAD"],
		url: "/shop/produkt",
		logLevel: "warn",
		preValidation: fastify.auth([fastify.asyncVerifyJWT]),
		preHandler: fastify.auth([fastify.asyncValidate]),
		handler: async (req, reply) => {
			try {
				const category = await Category.findOne(req.body.category);
				const product = new Product(req.body.product);
				await product.save();
				category.products.push(product);
				await category.save();
				reply.code(200).send({ Status: true });
			} catch (error) {
				reply.code(401).send({ error: error, Succes: false });
			}
		},
	});

	/* TODO Edits => Kategorie, Tags, */

	fastify.route({
		method: ["PUT"],
		url: "/shop/produkt",
		logLevel: "warn",
		preValidation: fastify.auth([fastify.asyncVerifyJWT]),
		preHandler: fastify.auth([fastify.asyncValidate]),
		handler: async (req, reply) => {
			try {
				const product = await Product.findByIdAndUpdate(
					req.body.id,
					req.body.product,
					{ new: true }
				);
				reply.code(200).send({ product, status: true });
			} catch (error) {
				reply.code(401).send({ error: error, status: false });
			}
		},
	});
};

module.exports = { shopRoutes };
