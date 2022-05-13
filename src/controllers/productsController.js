import db from "../db/db.js"
import { ObjectId } from "mongodb"

export const getProducts = async (req, res) => {
	const { limit, sortByPrice, search } = req.query
	let categories = req.query.categories
	let sortByPriceRange = req.query.sortByPriceRange

	categories ? (categories = categories.split(",")) : categories
	sortByPriceRange
		? (sortByPriceRange = sortByPriceRange.split(","))
		: sortByPriceRange

	const options = {
		limit: parseInt(limit),
		...(sortByPrice && {
			sort: { price: sortByPrice === "desc" ? -1 : 1 },
		}),
	}
	try {
		const products = await db
			.collection("products")
			.find(
				{
					...(search && { $text: { $search: search } }),
					...(categories && { categories: { $in: categories } }),
					$and: [
						{
							price: {
								$gte: sortByPriceRange
									? parseFloat(sortByPriceRange[0])
									: 0,
							},
						},
						{
							price: {
								$lte: sortByPriceRange
									? parseFloat(sortByPriceRange[1])
									: Infinity,
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
