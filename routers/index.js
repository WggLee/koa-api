'use strict'

const KoaRouter = require('koa-router')
// const assert = require('assert')
const router = new KoaRouter()
// const crypto = require('crypto')
// const moment = require('moment')

router.get('/', ctx => {
  ctx.body = 'server is running'
})

router.get('/index', async ctx => {
  let info = {
    id: '8989909',
    msg: 'success'
  }
  let mysqlRes = await require('../service/it').testMysql(ctx.request.body)
  ctx.body = {ok: true, info, mysqlRes}
})

module.exports = router
