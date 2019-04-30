'use strict'

const mysql = require('mysql')
const staticConfigs = require('../config').loadConfigs

let pool

function handleConnection () {
  // console.log("初始化连接池。。。。。")
  pool = mysql.createPool(staticConfigs.mysql)

  pool.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      setTimeout(handleConnection, 1000)
    } else {
      throw err
    }
  })

  pool.on('connection', function (connection) {
    console.log('链接新链接' + connection.threadId)
  })

  pool.on('enqueue', function () {
    console.log('Waiting for available connection slot')
  })
}

handleConnection()

async function getConn () {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        return reject(err)
      } else {
        return resolve({pool, connection})
      }
      // conn.release(); // not work!!!
      // pool.releaseConnection(conn)
    })
  })
}

async function doQuery (sql, pool, connection) {
  return new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows) {
      if (err) {
        console.error('异常释放线程id:' + connection.threadId)
        pool.releaseConnection(connection)
        return reject(err)
      } else {
        console.log('释放线程id:' + connection.threadId)
        pool.releaseConnection(connection)
        return resolve(rows)
      }
    })
  })
}

exports.getConn = getConn
exports.doQuery = doQuery
