# reverse-client
An auto-generated HTTP(S) API client for applications built using the
[`reverse`](https://www.npmjs.com/package/reverse) router.

## Installation
```bash
npm install reverse-client --save
```

## Usage

```js
const http = require('http')
const reverse = require('reverse')
const reverseClient = require('reverse-client')

const router = reverse`
  GET /bar getBar
  GET /foo/${reverse.param('id', String)} getFoo
`({
  getBar: () => console.log('getBar'),
  getFoo: (id) => console.log('getFoo', id),
})

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)
  const match = router.match(req.method, req.url)
  match.controller[match.name](match.context)
  res.writeHead(200)
  res.end()
})
server.listen(7676)

const client = reverseClient(router, 'http://127.0.0.1:7676')
client.getBar()
client.getFoo(10)
```
