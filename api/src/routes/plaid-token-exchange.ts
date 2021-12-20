import { Request, Response} from 'express'
import  express  from "express";
const router = express.Router()
const client = require('../config/plaidConfig')
const moment = require('moment');
const User = require('../models/user_model')

router.post('/', async (req: Request, res: Response) => {
  try{
    const { public_token } = req.body
    const { uid } = req.body
    const response = await client.itemPublicTokenExchange({ public_token})
    const access_token = response.data.access_token
    const accounts_response = await client.accountsGet({access_token})  
    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    const configs = {
      access_token: access_token,
      start_date: startDate,
      end_date: endDate,
      options: {
        count: 250,
        offset: 0,
      },
    };
    const identityResponse = await client.transactionsGet(configs)
    User.findByIdAndUpdate(uid, {transaction: identityResponse.data.transactions}, (err, data) => {
    });
    console.log(identityResponse)
    // User.findOneAndUpdate(uid, update)
    const transactionResponse = await client.accountsBalanceGet({access_token})
  } catch(error){
    // console.log(error)
  }
})

module.exports = router;