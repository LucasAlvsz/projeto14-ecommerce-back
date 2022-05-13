import bcrypt from "bcrypt"

import db from "./../db/db.js"

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const emailExists = await db.collection("users").findOne({ email })
    if (emailExists)
      return res.status(409).send("email, this email already exists")

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.BCRYPT_SALT),
    )

    const newUser = {
      name,
      email,
      password: hashedPassword,
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
