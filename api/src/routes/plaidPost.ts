import { TransactionsGetRequest } from 'plaid'

import { Request, Response} from 'express'
import  express  from "express";
const app = express();
const router = express.Router()
const client = require('../config/plaidConfig')



const moment = require('moment');
router.post('/', async (req: Request, res: Response) => {
  const { public_token } = req.body
  try{
    const response = await client.itemPublicTokenExchange({ public_token})
    const access_token = response.data.access_token

    const accounts_response = await client.accountsGet({access_token})
    console.log('-------- ACCOUNT RESPONSE ----------')
    console.log(accounts_response.data)
    
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
    console.log('--------- Identity Response --------')
    console.log(identityResponse.data)
    
    const transactioneResponse = await client.accountsBalanceGet({access_token})
    console.log('--------- Accounts Balance Response --------')
    console.log(transactioneResponse.data)

  } catch(error){
    console.log(error)
  }
  
  
})

module.exports = router;