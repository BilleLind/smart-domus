const mongoose = require("mongoose");

/* product schema */
const productSchema = mongoose.Schema({
	title: { type: String, required: true },
	cardImage: { type: String, required: true },
	images: [String],
	describtion: { type: String, required: true },
	price: {
		type: String,
		required: true,
	},
	rabat: {
		isTrue: { type: Boolean, required: true },
		price: String,
	},
	tags: [String],
	producent: String,
	specs: [
		/* flere */
		{
			quantity: Number,
			EAN: { type: String, unique: true },
			farve: String,
		},
	],
});

/* Kategorie schema */
const categorieSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true },
	number: { type: Number, required: true, unique: true },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const tagSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true}
})

/* på Category.findCategory */
categorieSchema.statics.findCategory = async (params) => {
	const categories = await Category.find({
		params,
	}); /* kunne være name eller number */

	return await { categories };
};
/*  */
productSchema.statics.findProduct = async (params) => {
	const products = await Product.find({ params });

	return await { products };
};

const Category = mongoose.model("Category", categorieSchema);
const Product = mongoose.model("Product", productSchema);
const Tag = mongoose.model("Tag", tagSchema)

module.exports = { Category, Product, Tag};
