'use strict'

const Koa = require('koa')
const koaBody = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const session = require('koa-session')

const initMongDb = require('../lib/initMongDb')
const logger = require('../lib/httpLogger')
const requestLog = require('../middlewares/requestLog')
const staticConfigs = require('../config').loadConfigs

const CONFIG = {
  key: 'koa:sess',
  maxAge: 7200000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}

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
            dingtalkRobotHook: process.env.NODE_ENV === 'production' ? 'https://oapi.dingtalk.com/robot/send?access_token=556a1fd13ce7e79dc23bd6f411429208059bd5b6dbf5759d91df14d03c2abe6e' : 'https://oapi.dingtalk.com/robot/send?access_token=201901de5a73c88eb24138ae100075b5c247f5a2481d6687a6a9ed4322ced7dd',
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
      app.key = 'biz_server'
      app.use(session(CONFIG, app))
    })
    .then(() => {
      app.listen(staticConfigs.port, function () {
        console.warn('biz server is running ~ ')
      })
    })
    .catch(err => console.error('server init error:', err))
})()

function gracefulShutDown () {
  console.warn('App exit.')
  process.exit(1)
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

process.on('SIGINT', gracefulShutDown)
