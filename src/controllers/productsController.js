import db from "../db/db.js"
import { ObjectId } from "mongodb"
import getKeywordRegex from "../utils/getKeywordRegex.js"

export const searchProducts = async (req, res) => {
	const { limit, sortBy, maxPrice, minPrice, categories } =
		res.locals.formattedQuery
	const { keyword } = req.query
	let formattedKeyword
	if (keyword) formattedKeyword = getKeywordRegex(keyword)

	const options = {
		limit,
		...(sortBy && { sort: { price: sortBy === "price" ? 1 : "" } }),
	}

	try {
		console.log(categories)
		const products = await db
			.collection("products")
			.find(
				{
					...(keyword && { name: formattedKeyword }),
					categories: { $in: categories },
					$and: [
						{
							price: {
								$gte: minPrice,
							},
						},
						{
							price: {
								$lte: maxPrice,
							},
						},
					],
				},
				options
			)
			.toArray()
		res.send(products)
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

export const postProducts = async (req, res) => {
	const { name, price, description, categories, images, available, info } =
		req.body
	const product = {
		name,
		price,
		description,
		categories,
		images,
		available,
		info,
	}
	try {
		const result = await db.collection("products").insertOne(product)
		res.send(result)
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

export const putProducts = async (req, res) => {
	const { productId } = req.params
	const { name, price, description, categories, images, available, info } =
		req.body
	const product = {
		name,
		price,
		description,
		categories,
		images,
		available,
		info,
	}
	try {
		console.log(product)
		const { modifiedCount } = await db
			.collection("products")
			.updateOne({ _id: new ObjectId(productId) }, { $set: product })
		if (!modifiedCount)
			return res.status(409).send("O produto não teve alterações")
		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

export const deleteProducts = async (req, res) => {
	const { productId } = req.params
	try {
		const result = await db
			.collection("products")
			.deleteOne({ _id: new ObjectId(productId) })
		if (!result.deletedCount)
			return res.status(409).send("O produto não foi deletado")
		res.send(result)
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}
