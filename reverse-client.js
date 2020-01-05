'use strict'

const needle = require('needle')

const Client = function (router, options) {
  if (typeof options === 'string') options = { baseUrl: options }
  this._router = router
  this._baseUrl = options.baseUrl
  if (!this._baseUrl) throw new Error('A `baseUrl` is required')
  this._json = !(options.json === false)
  this._validate = options.validate || false
  this._headers = options.headers || {}
}

Client.prototype._request = function (options) {
  return needle(
    options.method,
    this._baseUrl + options.url,
    options.data,
    {
      json: this._json,
      headers: { ...(options.headers || {}), ...this._headers }
    }
  ).then(resp => resp.body)
}

module.exports = function (router, options) {
  let client = new Client(router, options)

  router.targets.forEach(target => {
    client[target.name] = function (...args) {
      function * arg () {
        const arg = args.shift()
        if (client._validate && !arg) throw new Error('Not enough arguments')
        yield arg
      }

      const args_ = arg()
      const url = target.route
        .map((xs, index) => typeof xs === 'string' ? xs : args_.next().value)
        .join('')

      return this._request({
        method: target.method,
        url: url,
        data: args.shift()
      })
    }
  })

  return client
}
