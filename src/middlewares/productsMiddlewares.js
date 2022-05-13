import Joi from "joi"
import { ObjectId } from "mongodb"

export const getProductsValidation = async (req, res, next) => {
	const schema = Joi.object({
		search: Joi.string(),
		limit: Joi.number().integer().min(1).max(100).default(10),
		sortByPrice: Joi.string().valid("asc", "desc").default("asc"),
		categories: Joi.string().allow("").default(""),
		sortByPriceRange: Joi.string(),
	})
	const { error } = schema.validate(req.query, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))
	next()
}

const validateObjectId = id => {
	if (ObjectId.isValid(id)) if (String(new ObjectId(id)) === id) return id
	return "A valid ObjectId"
}

export const getProductsIdValidation = async (req, res, next) => {
	const schema = Joi.object({
		productId: Joi.string()
			.valid(validateObjectId(req.params.productId))
			.required(),
	})
	const { error } = schema.validate(req.params, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))
	next()
}

export const postProductsValidation = async (req, res, next) => {
	const schema = Joi.object({
		body: Joi.object({
			name: Joi.string().required(),
			price: Joi.number().required(),
			description: Joi.object().min(1).max(20).required(),
			info: Joi.string().required(),
			categories: Joi.array().items(Joi.string()).required(),
			images: Joi.array().items(Joi.string()).required(), //irei fazer a validação se é uma imagem depois
			available: Joi.number().integer().min(1).max(9999).required(),
		}).required(),
		headers: Joi.object({
			authorization: Joi.string()
				.pattern(/^Bearer\s[a-f0-9-]{36}$/)
				.required(),
		}).options({ allowUnknown: true }),
	}).options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))

	next()
}

export const putProductsIdValidation = async (req, res, next) => {
	console.log(req.params.productId)
	const schema = Joi.object({
		params: Joi.object({
			productId: Joi.string()
				.valid(validateObjectId(req.params.productId))
				.required(),
		}),
		body: Joi.object({
			name: Joi.string(),
			price: Joi.number(),
			description: Joi.object().min(1).max(20),
			info: Joi.string(),
			categories: Joi.array().items(Joi.string()),
			images: Joi.array().items(Joi.string()),
			available: Joi.number().integer().min(1).max(9999),
		})
			.min(1)
			.required(),
		headers: Joi.object({
			authorization: Joi.string()
				.pattern(/^Bearer\s[a-f0-9-]{36}$/)
				.required(),
		}).options({ allowUnknown: true }),
	}).options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))

	next()
}

export const deleteProductsIdValidation = async (req, res, next) => {
	const schema = Joi.object({
		params: Joi.object({
			productId: Joi.string()
				.valid(validateObjectId(req.params.productId))
				.required(),
		}),
		headers: Joi.object({
			authorization: Joi.string()
				.pattern(/^Bearer\s[a-f0-9-]{36}$/)
				.required(),
		}).options({ allowUnknown: true }),
	}).options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))
	next()
}
