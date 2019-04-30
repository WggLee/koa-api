'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfoSchema = new Schema({
  unionId: {
    type: String,
    required: true,
    comment: '用户的微信unionId'
  },
  openId: {
    type: String,
    required: true,
    comment: '用户唯一身份标志'
  },
  userId: {
    type: String,
    comment: '用户在洋葱数学App中的userId'
  },
  nickName: {
    type: String,
    required: true,
    comment: '用户昵称'
  },
  createTime: {
    type: Date,
    default: Date.now,
    required: true,
    comment: '添加时间'
  }
})

UserInfoSchema.index({ openId: -1 }, { background: true, unique: true })
UserInfoSchema.index({ unionId: -1 }, { background: true })

mongoose.model('UserInfo', UserInfoSchema)
