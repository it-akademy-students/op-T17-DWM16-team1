const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const User = require('../models/user_model')
import { Request, Response} from 'express'


router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});



router.post('/', async (req: Request, res:Response) => {
    const { email, password } = req.body
    // Find the user in my collection
    const user = await User.findOne({ email })
    console.log(user)
    if(!user) {
      return res.json({ status: 'error', error: '401'})
    } 
    console.log(user.email)
    if(await bcrypt.compare(password, user.hashPassword)){
      // the username, password combination is succesful
      const token = jwt.sign({
        id: user._id,
        email: user.email
      }, process.env.JWT_SECRET)
      return res.json({ status: 'ok', data: token})
    }
    res.json({status: 'error', error:'401'})
  })










module.exports = router;