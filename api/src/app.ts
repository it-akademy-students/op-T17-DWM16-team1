import express from 'express';
import cors from 'cors'
import { Request, Response} from 'express'
import { connect } from './database/database';
import { Configuration, PlaidApi, PlaidEnvironments, LinkTokenCreateRequest, Products, CountryCode } from 'Plaid'
import { link } from 'fs';

const plaid = require('plaid')
require('dotenv/config')
const app = express();
const port = 9000;
const router = express.Router();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRoutes = require('./routes/login');
const signRoute = require('./routes/sign');
const plaidGetRoute = require('./routes/plaidGet');
const plaidPostRoute = require('./routes/plaidPost');



app.use(bodyParser.urlencoded({extends: true}))
app.use(cors())
app.use(express.json())

app.use('/login' , loginRoutes)
app.use('/register', signRoute)
app.use('/create_link_token', plaidGetRoute)
app.use('/plaid_token_exchange', plaidPostRoute)

connect()



// app.get('/create_link_token', async function (request, response) {
//     // Get the client_user_id by searching for the current user
//     const linkTokenParams: LinkTokenCreateRequest = {
//         user: {
//           // This should correspond to a unique id for the current user.
//           client_user_id: 'test',
//         },
//         client_name: 'Plaid Test App',
//         products: [Products.Auth, Products.Transactions],
//         language: 'fr',
//         webhook: 'https://webhook.example.com',
//         country_codes: [CountryCode.Us],
//       };
//       try {
//         const createResponse = await client.linkTokenCreate(linkTokenParams)
//         const { link_token } = createResponse.data
//         response.json({link_token})
//       } catch(error){
//         console.log(error)
//       }
//   });
// import { TransactionsGetRequest } from 'plaid'
// const moment = require('moment');
// app.post('/plaid_token_exchange', async (req: Request, res: Response) => {
//   const { public_token } = req.body
//   try{
//     const response = await client.itemPublicTokenExchange({ public_token})
//     const access_token = response.data.access_token

//     const accounts_response = await client.accountsGet({access_token})
//     console.log('-------- ACCOUNT RESPONSE ----------')
//     console.log(accounts_response.data)
    
//     const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
//     const endDate = moment().format('YYYY-MM-DD');
//     const configs = {
//       access_token: access_token,
//       start_date: startDate,
//       end_date: endDate,
//       options: {
//         count: 250,
//         offset: 0,
//       },
//     };
//     const identityResponse = await client.transactionsGet(configs)
//     console.log('--------- Identity Response --------')
//     console.log(identityResponse.data)
    
//     const transactioneResponse = await client.accountsBalanceGet({access_token})
//     console.log('--------- Accounts Balance Response --------')
//     console.log(transactioneResponse.data)

//   } catch(error){
//     console.log(error)
  // }
  
  
// })

app.listen(port, () => {
  console.log(`Api is running on ${port}.`);
});


module.exports = router;
