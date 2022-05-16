import Joi from "joi"
import { ObjectId } from "mongodb"

export const postCategoryValidation = (req, res, next) => {
	const { isAdmin } = res.locals.user
	if (!isAdmin) return res.sendStatus(401)
	const schema = Joi.object({
		body: Joi.object({
			name: Joi.string().required(),
		}),
		headers: Joi.object({
			authorization: Joi.string()
				.pattern(/^Bearer\s([\w-]*\.[\w-]*\.[\w-]*$)/)
				.required(),
		}).options({ allowUnknown: true }),
	}).options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))
	next()
}
const validateObjectId = id => {
	if (id && ObjectId.isValid(id))
		if (String(new ObjectId(id)) === id) return id
	return "A valid ObjectId"
}
export const PutAndDeleteCategoryValidation = (req, res, next) => {
	const { isAdmin } = res.locals.user
	if (!isAdmin) return res.sendStatus(401)
	const schema = Joi.object({
		params: Joi.object({
			categoryId: Joi.valid(
				validateObjectId(req.params.categoryId)
			).required(),
		}),
		headers: Joi.object({
			authorization: Joi.string()
				.pattern(/^Bearer\s([\w-]*\.[\w-]*\.[\w-]*$)/)
				.required(),
		}).options({ allowUnknown: true }),
	}).options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))
	next()
}
