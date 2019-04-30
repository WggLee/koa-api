'use strict'

const KoaRouter = require('koa-router')
// const assert = require('assert')
const router = new KoaRouter()
// const crypto = require('crypto')
// const moment = require('moment')

router.get('/', ctx => {
  ctx.body = 'primary-school server is running'
})

module.exports = router
