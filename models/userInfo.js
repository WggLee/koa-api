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
  wxUserInfo: {
    avatarUrl: {
      type: String,
      required: true,
      comment: '用户头像'
    },
    city: {
      type: String,
      require: true,
      comment: '所在城市'
    },
    country: {
      type: String,
      require: true,
      comment: '所在国家'
    },
    gender: {
      type: Number,
      required: true,
      comment: '性别 1/0'
    },
    language: {
      type: String,
      required: true,
      comment: '语言 zh_CN'
    },
    nickName: {
      type: String,
      required: true,
      comment: '用户昵称'
    },
    province: {
      type: String,
      required: true,
      comment: '所在城市'
    }
  },
  createTime: {
    type: Date,
    default: Date.now,
    required: true,
    comment: '添加时间'
  },
  lastUseDate: {
    type: Date,
    default: Date.now,
    comment: '最后使用时间'
  },
  appId: {
    type: String,
    comment: '辨别用户信息，即用户是从小程序还是公众号来的'
  },
  phone: {
    type: String,
    comment: '用户绑定的手机号'
  },
  grade: {
    type: Number,
    comment: '用户选择的年级'
  },
  channel: {
    type: String,
    comment: '用户进入小程序时的来源'
  },
  scene: {
    type: String,
    comment: '用户进入小程序时的场景'
  }
})

UserInfoSchema.index({ openId: -1 }, { background: true, unique: true })
UserInfoSchema.index({ unionId: -1 }, { background: true })
UserInfoSchema.index({ phone: -1 }, { background: true })
UserInfoSchema.pre('save', function (next) {
  if (!this.createdTime) {
    this.created = new Date()
    this.lastUseDate = new Date()
  }
  if (!this.score) {
    this.score = { number: 0, scoreUpdateTime: new Date() }
  }
  next()
})

mongoose.model('UserInfo', UserInfoSchema)
