import Joi from "joi"
import { ObjectId } from "mongodb"

export const getProductsValidation = async (req, res, next) => {
	const schema = Joi.object({
		limit: Joi.number().integer().min(1).max(100).default(10),
		sortByPrice: Joi.string().valid("asc", "desc").default("asc"),
		categories: Joi.string().allow("").default(""),
		sortByPriceRange: Joi.string().allow("").default(""),
	})
	const { error } = schema.validate(req.query, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))
	next()
}
