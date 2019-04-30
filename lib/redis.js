'use strict'

const ioredis = require('ioredis')
const RedLock = require('redlock')
const staticConfigs = require('../config').loadConfigs

const redis = new ioredis({ // eslint-disable-line
  port: staticConfigs.redis.port,
  host: staticConfigs.redis.host,
  password: staticConfigs.redis.password,
  db: staticConfigs.redis.db,
  keyPrefix: staticConfigs.redis.keyPrefix
})

redis.on('connect', function () {
  console.warn('redis connect successfully. ' + staticConfigs.redis.host + ': ' + staticConfigs.redis.port)
})

redis.on('error', function (err) {
  console.error(err)
})

const redlock = function (options) {
  if (!options) {
    options = {
      driftFactor: 0.01,
      retryCount: 1
    }
  }
  let redlock = new RedLock([redis], options)
  redlock.on('clientError', err => console.error('A redis error has occurred on redlock client:', err))
  return redlock
}

redis.getRedlockClient = redlock

exports.redlock = redlock
exports.Redis = redis
