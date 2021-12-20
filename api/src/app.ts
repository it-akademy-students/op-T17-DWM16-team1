import express from 'express'
import cors from 'cors'
import { connect } from './database/database'
require('dotenv/config')

const app = express();
const port = 9000;
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/login')
const signRoute = require('./routes/sign')
const createLinkToken = require('./routes/create-link-token')
const plaidTokenExchange = require('./routes/plaid-token-exchange')
const userTransactions = require('./routes/user-transactions')
const chartData = require('./routes/chart_data')

app.use(bodyParser.urlencoded({extends: true}))
app.use(cors())
app.use(express.json())

connect()

app.use('/login' , loginRoutes)
app.use('/register', signRoute)
app.use('/create_link_token', createLinkToken)
app.use('/plaid_token_exchange', plaidTokenExchange)
app.use('/transactions', userTransactions)
app.use('/chart', chartData)

app.listen(port, () => {
    console.log(`Api is running on ${port}.`)
  });