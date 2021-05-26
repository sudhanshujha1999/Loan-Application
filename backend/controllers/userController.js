import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc   authenticate user & get token
//@route  POST /api/users/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password!')
  }
})

//@desc   register a new user
//@route  POST /api/users
//@access public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('email already exist')
  }

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
  })

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc   get user profile
//@route  GET /api/users/profile
//@access private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

//@desc   update user profile
//@route  PUT /api/users/profile
//@access private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})
