'use strict'

const needle = require('needle')

const Client = function (router, options) {
  if (typeof options === 'string') options = { baseUrl: options }
  this._router = router
  this._baseUrl = options.baseUrl
  if (!this._baseUrl) throw new Error('A `baseUrl` is required')
  this._validate = options.validate || false

}

Client.prototype._request = function (options) {
  return needle(options.method, this._baseUrl + options.url)
}

module.exports = function (router, url) {
  let client = new Client(router, url)

  router.targets.forEach(target => {
    client[target.name] = function (...args) {
      const url = target.route
        .map((xs, index) => typeof xs === 'string' ? xs : args.shift())
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
