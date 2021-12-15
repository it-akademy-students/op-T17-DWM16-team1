import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { TransactionsGetRequest } from 'plaid'
import  express  from 'express';
const router = express.Router()
const plaid = require('plaid')
require('dotenv/config')


const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.CLIENT_ID,
      'PLAID-SECRET': process.env.SECRET,
    }
  }
})

const client = new PlaidApi(configuration)
// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;


module.exports = client;