'use strict'

const Koa = require('koa')
const koaBody = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const cors = require('koa2-cors')

const initMongDb = require('../lib/initMongDb')
const logger = require('../lib/httpLogger')
const requestLog = require('../middlewares/requestLog')
const staticConfigs = require('../config').loadConfigs

global._ = require('lodash')

mongoose.Promise = global.Promise;

(function start () {
  let router, app
  return Promise.resolve(true)
    .then(() => initMongDb())
    .then(() => {
      router = require('../routers/index')
      app =
        new Koa()
          .use(logger({
            dingtalkRobotHook: process.env.NODE_ENV === 'production' ? '' : '',
            delegateConsole: true,
            separator: process.env.NODE_ENV === 'production' ? '§' : '\t'
          }))
          .use(cors({
            origin: '*',
            exposeHeaders: ['Content-Range']
          }))
          .use(requestLog())
          .use(xmlParser())
          .use(koaBody())
          .use(router.routes())
          .use(koaStatic('./statics'))
          .use(router.allowedMethods())
      app.key = 'sendMQ_server'
    })
    .then(() => {
      app.listen(staticConfigs.sendMQPort, function () {
        console.warn('sendMQ server on: ' + staticConfigs.sendMQPort + '  is running ~ ')
      })
    })
    .catch(err => console.error('sendMQ server init error:', err))
})()

function gracefulShutDown () {
  console.warn('sendMQ server App exit.')
  process.exit(1)
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

process.on('SIGINT', gracefulShutDown)
