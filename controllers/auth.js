const UserSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if(!(name && email && password)) {
      res.status(400).send('Enter all inputs')
    }
    let hashPassword = await bcrypt.hash(password, 10)
    let user = await UserSchema.create({
      name,
      email,
      hashed_password: hashPassword
    })
    const token = jwt.sign({
      _id: user._id,
      email
    }, "ToDoes")
    user.token = token
    res.status(201).json(user)
  } catch (error) {
    console.log(error);
  }
}

const authorization = async (req, res) => {
  try {
    const { email, password } = req.body
    if(!(email && password)) {
      res.status(400).send('Enter all inputs')
    }
    const user = await UserSchema.findOne({email})
    if(user && (await bcrypt.compare(password, user.hashed_password))) {
      const token = jwt.sign({
        _id: user._id,
        email
      }, "ToDoes")
      user.token = token
      res.status(200).json(user)
    } else {
      res.status(400).send('Invalid credentials')
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  registration,
  authorization
}