import { Request, Response} from 'express'
const express = require('express')
const router = express.Router()
const User = require('../models/user_model')

class Transaction {
  name: string;
  category: [];
  date: string;
  currency: string;
  amount: number;

  constructor(name: string, category: [string], date: string, currency: string, amount: number ){
    this.name = name
    this.category = []
    this.date = date
    this.currency = currency
    this.amount = amount
  }
}

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.post('/', async(req: Request, res: Response) => {
    const {uid} = req.body
    const user = await User.findOne({ _id:uid })
    const  { transaction } = user
    const user_transactions = transaction.map(item => {
      const user_transaction = new Transaction(
        item.name,
        item.category,
        item.date,
        item.iso_currency_code,
        item.amount,
        )
      return user_transaction
    }) 
    res.json(user_transactions)
  })

module.exports = router;