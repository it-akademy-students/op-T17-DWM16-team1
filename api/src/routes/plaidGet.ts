import { TransactionsGetRequest } from 'plaid'
import { CountryCode, LinkTokenCreateRequest, Products } from "plaid";
import { Request, Response} from 'express'
import  express  from "express";
const app = express();
const router = express.Router()
const client = require('../config/plaidConfig')


router.get('/', async function (request, response) {
    // Get the client_user_id by searching for the current user
    const linkTokenParams: LinkTokenCreateRequest = {
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: 'test',
        },
        client_name: 'Plaid Test App',
        products: [Products.Auth, Products.Transactions],
        language: 'fr',
        webhook: 'https://webhook.example.com',
        country_codes: [CountryCode.Us],
      };
      try {
        const createResponse = await client.linkTokenCreate(linkTokenParams)
        const { link_token } = createResponse.data
        response.json({link_token})
      } catch(error){
        console.log(error)
      }
  });



  module.exports = router;