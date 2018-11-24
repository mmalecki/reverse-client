'use strict'

const reverse = require('reverse')

module.exports = reverse`
  GET /bar getBar
  GET /foo/${reverse.param('id', String)} getFoo
`({
  getBar: () => console.log('getBar'),
  getFoo: (id) => console.log('getFoo', id),
})
