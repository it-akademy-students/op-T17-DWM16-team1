import  express  from 'express';
import { Request, Response} from 'express'
const router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../models/user_model')

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || typeof email !== 'string') {
    return res.json({ status: 'error', error: 'Invalid Username' })
  }
  if (!password || typeof password !== 'string') {
    return res.json({ status: 'error', error: 'Invalid Password' })
  }
  if (password.length < 6) {
    return res.json({ status: 'error', error: 'Password should be atleat 6 characters' })
  }
  //Hashing the password
  const hashPassword = await bcrypt.hash(password, 10)
  try {
    const response = await User.create({
      email,
      hashPassword,
    })
    console.log('user created', response)
  } catch (error) {
    if (error.code === 11000) {
      //duplicate key
      return res.json({ status: 'error', error: 'Email already in use' })
    }
    throw error
  }
  res.json({ status: 'ok' })
})
module.exports = router;