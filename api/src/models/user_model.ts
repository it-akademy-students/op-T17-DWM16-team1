const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
import { Request, Response} from 'express'



let userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    hashPassword: {type: String, required:true},
    transaction: Array,
},{ collection: 'users'}
)

let User = mongoose.model('User', userSchema)

module.exports = mongoose.model('User', userSchema);