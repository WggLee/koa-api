'use strict'

const mongoose = require('mongoose')
const staticConfigs = require('../config').loadConfigs
const requireDir = require('require-dir')

mongoose.Promise = global.Promise

module.exports = async function () {
  if (mongoose.connection.readyState === 0) {
    mongoose.connection.on('error', function (err) {
      console.error(err)
      console.info('Exit process.')
      process.exit(1)
    })
    await mongoose.connect(staticConfigs.mongoDB.url, staticConfigs.mongoDB.options)
    console.warn('Database connected.')
  }
  loadAllMongooseModel()
}

function loadAllMongooseModel () {
  requireDir('./../models')
}
