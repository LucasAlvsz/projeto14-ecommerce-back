import bcrypt from "bcrypt"

import db from "./../db/db.js"
import { signupSchema } from "./../schemas/authSchema.js"

export async function signup(req, res) {
  const { error } = signupSchema.validate(req.body, { abortEarly: false })

  if (error) {
    const messages = error.details.map(({ message }) => message).join(", ")
    return res.status(422).send(messages)
  }

  try {
    const { name, email, password } = req.body

    const emailExists = await db.collection("users").findOne({ email })

    if (emailExists) return res.status(422).send("This email already exists.")

    const encryptedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.BCRYPT_SALT),
    )

    const newUser = {
      name,
      email,
      password: encryptedPassword,
      isAdmin: false,
      created_at: Date.now(),
      updated_at: Date.now(),
    }

    await db.collection("users").insertOne(newUser)
    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
    console.error(e)
  }
}
