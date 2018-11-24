'use strict'

const reverseClient = require('../../')
const router = require('./router.js')

console.log('creating a client')
const client = reverseClient(router, 'http://127.0.0.1:7676')

client.getBar()
client.getFoo(10)
