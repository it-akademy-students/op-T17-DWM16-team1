import { Request, Response} from 'express'
const express = require('express')
const router = express.Router()
const User = require('../models/user_model')


router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

class Data {
  name: string;
  category: string;
  amount : number;
  
  constructor(name: string, category: string, number: number){
    this.name = name
    this.category = category
    this.amount = number
  }
}

class ChartObject {
  household: [number];
  food: [number];
  other : [number]

  constructor(household: [number], food: [number], other: [number]){
    this.household = household
    this.food = food
    this.other = other
  }
}

router.post('/', async(req: Request, res: Response) => {
    const {uid} = req.body
    const user = await User.findOne({ _id:uid })
    const { transaction } = user
    const transaction_data = transaction.map(item => {
      const data = new Data(
        item.name,
        item.category,
        item.amount
      )
      return data
    })
    let household: any = []
    let food: any = [];
    let other: any = []
    for(let i = 0; i < transaction_data.length; i++){
      if(transaction_data[i].category[0] == 'Food and Drink'){
        food.push(transaction_data[i].amount)
      }
      if(transaction_data[i].category[0] == 'Travel'){
        other.push(transaction_data[i].amount)
      }
      if(transaction_data[i].category[0] == 'Shops'){
        other.push(transaction_data[i].amount)
      }
      if(transaction_data[i].category[0] == 'Transfer'){
        household.push(transaction_data[i].amount)
      }
      if(transaction_data[i].category[0] == 'Payment'){
        household.push(transaction_data[i].amount)
      }
    }
  let houseChart = household.reduce((a,b) => a +b)
  let foodChart = food.reduce((a,b) => a +b)
  let otherChart = other.reduce((a,b) => a +b)
  let sending_data = new ChartObject(houseChart, foodChart, otherChart)
  console.log(sending_data)
  res.json(sending_data)
  })

module.exports = router;