'use strict'

const http = require('http')
const router = require('./router.js')

const ecstatic = require('ecstatic')({ root: __dirname })

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)
  const match = router.match(req.method, req.url)
  if (!match) return ecstatic(req, res)
  match.controller[match.name](match.context)
  res.writeHead(200)
  res.end()
})
server.listen(7676)
