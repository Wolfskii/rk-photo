const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = {}

auth.readEntry = async (req, res, next) => {
  try {
    res.json({
      links: {
        self: { href: '', method: 'GET', desc: 'Details about the users methods and further links' },
        loginUser: { href: '/login', method: 'POST', desc: 'Login user', params: '{email}, {password}' },
        getUser: { href: '/:id', method: 'GET', desc: 'GET user-info if logged in and is you', params: '{id}', authToken: '{token}' },
        editUser: { href: '/:id', method: 'PUT', desc: 'Change a user if logged in and is you', params: '{id}, {name}, {email}', authToken: '{token}' }
      }
    })
  } catch (err) {
    res.json({ message: err })
  }
}

auth.readLogin = async (req, res, next) => {
  try {
    res.json({
      links: { self: { href: '', method: 'POST', desc: 'Login user', params: '{email}, {password}' } }
    })
  } catch (err) {
    res.json({ message: err })
  }
}

auth.login = async (req, res, next) => {
  try {
    // TODO: Add more validation of passed parameters

    // Check if user exists
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).send('Email or password is wrong') // Outputs both email and password as wrong so they can't guess!
    }

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
      return res.status(400).send('Email or password is wrong') // Outputs both email and password as wrong so they can't guess!
    }

    // Create and give token - Expiry of 1 hour
    const token = jwt.sign({ _id: user._id.toString(), name: user.name, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })
    res.header('auth-token', token)
    res.header('expires', 3600)
    res.json({
      authToken: token,
      expiresIn: 3600,
      links: { self: { href: '', method: 'POST', desc: 'Login user', params: '{email}, {password}' } }
    })
  } catch (err) {
    res.json({ message: err })
  }
}

auth.register = async (req, res, next) => {
  // Check if user already exists
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) {
    return res.status(400).send('Email already exists')
  }

  // Salting and hashing of the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    // Adding HATEOAS-linkings
    user.links = {
      self: `/api/users/${user._id}`
    }
    await user.save()
    res.status(201).json({
      message: 'User created succesfully',
      name: user.name,
      email: user.email,
      _id: user._id
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

auth.readById = async (req, res, next) => {
  try {
    if (req.user._id === req.params.userId) {
      const user = await User.findOne({ _id: req.params.userId }) // TODO: Fix so using _id works on all places!
      res.json(user)
    } else {
      res.status(401).send('Access denied, you can only see your own user data!')
    }
  } catch (err) {
    res.json({ message: err })
  }
}

auth.updateById = async (req, res, next) => {
  try {
    const searchedUser = await User.findOne({ _id: req.params.userId })
    if (req.user._id === req.params.userId) {
      await User.updateOne({ _id: req.params.userId }, { $set: { name: req.body.name, email: req.body.email } })
      res.json({
        updatedUser: searchedUser,
        links: {
          self: { href: '', method: 'PUT', desc: 'Change a user if logged in and is your', params: '{name}, {email}', authToken: '{token}' }
        }
      })
    } else {
      res.status(401).send('Access denied, you can only update your own user data!')
    }
  } catch (err) {
    res.json({ message: err })
  }
}

module.exports = auth
