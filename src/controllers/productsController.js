import db from "../db/db.js"
import { ObjectId } from "mongodb"

export const getProducts = async (req, res) => {
	const { limit, sortByPrice } = req.query
	let categories = req.query.categories
	let sortByPriceRange = req.query.sortByPriceRange
	const stringToArrayRegex = /[\[\]'\s]+/g

	categories
		? (categories = categories.replace(stringToArrayRegex, "").split(","))
		: categories
	sortByPriceRange
		? (sortByPriceRange = sortByPriceRange
				.replace(stringToArrayRegex, "")
				.split(","))
		: sortByPriceRange

	const options = {
		limit: parseInt(limit),
		...(sortByPrice && { sort: { price: sortByPrice } }),
	}

	const products = await db
		.collection("products")
		.find(
			{
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
}

export const postProducts = async (req, res) => {
	const { name, price, categories } = req.body
	const product = {
		name,
		price,
		categories,
	}
	const result = await db.collection("products").insertOne(product)
	res.send(result)
}
