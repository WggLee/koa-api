'use strict'

const configModel = {
  port: process.env.NODE_PORT || 8000,
  mqPort: process.env.NODE_PORT || 8001,
  sendMQPort: process.env.NODE_PORT || 8002,
  wechat: {
    appId: 'wxeae6c171a983e1f4',
    appSecret: '2a4af6ea9cb089d243829338b3f86d6a',
    token: 'e9ukx1wnnapm7vdizudvkml2l1a2uqnv',
    originId: 'gh_8a13876e86c2',
    api: {
      getAccessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token'
    },
    ttl: {
      accessToken: 100 // 单位秒=>毫秒需要*1000
    }
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 5,
    password: 'KYUIAPErZz2Xb0f8XIQOKfuv7dYURu',
    keyPrefix: 'wechat-api:'
  },
  qiniu: {
    accessKey: 'cIz1V358Ef7woh_xZ0cH5mTGWv-Q7fHf71saOcjn',
    secretKey: 'G64UVmj1wZfLXqjrJ-fYqA1XCkbTAfiTSIqIBU8Y',
    bucket: 'yc-wechat'
  },
  mongoDB: {
    url: 'mongodb://127.0.0.1/primary',
    options: {
      useMongoClient: true,
      keepAlive: 1,
      poolSize: 10
    }
  },
  jwt: {
    secret: 'follow your heart&intuition',
    options: {
      expiresIn: 7200
    }
  },
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    database: 'test',
    user: 'root',
    password: 'root',
    connectionLimit: 1200,
    waitForConnections: true,
    acquireTimeout: 3000,
    charset: 'utf8mb4',
    multipleStatements: true
  }
}

module.exports = configModel
