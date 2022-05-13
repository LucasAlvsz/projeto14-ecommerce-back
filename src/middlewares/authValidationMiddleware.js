import Joi from "joi"

export const signUpValidation = async (req, res, next) => {
  const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    confirmPassword: Joi.string()
      .min(3)
      .max(30)
      .required()
      .valid(Joi.ref("password")),
  })

  const { error } = signUpSchema.validate(req.body, { abortEarly: false })

  if (error) {
    const messages = error.details.map(({ message }) => message).join(", ")
    return res.status(422).send(messages)
  }

  next()
}
