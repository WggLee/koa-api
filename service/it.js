'use strict'

const mysqlPool = require('../lib/mysqlPool')

/**
 * test mysql conn
 * @param body
 * @returns {Promise<void>}
 */
exports.testMysql = async function (body) {
  let {pool, connection} = await mysqlPool.getConn()
  console.log('pool:' + pool)
  console.log('connection:' + connection)
  let sql = `select * from runoob_tbl  limit 0,1000`
  let res = await mysqlPool.doQuery(sql, pool, connection)
  return {ok: true, res}
}
