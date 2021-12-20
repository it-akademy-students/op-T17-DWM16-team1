import { Request, Response} from 'express'
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model')

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.post('/', async (req: Request, res:Response) => {
  console.log(req.body)
  const { email, password } = req.body
  // Find the user in my collection
  console.log(email)
  const user = await User.findOne({ email })
  // console.log(user)
  if(!user) {
    return res.send(400)
  } 
  console.log(user.email)
  if(await bcrypt.compare(password, user.hashPassword)){
    // the username, password combination is succesful
    const token = jwt.sign({
      id: user._id,
      email: user.email
    }, process.env.JWT_SECRET)
    return res.json({ status: 'ok', data: user})
  }
  res.json({status: 'error', error:'401'})
  })

module.exports = router;