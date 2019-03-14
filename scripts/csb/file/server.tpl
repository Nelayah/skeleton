module.exports = {

  systemName: '{{systemName}}',

  host: 'localhost://',

  port: process.env['PORT'] || 3000,

  // 4A 单点登录配置
  // 应用域名
  domain: '{{domain}}',
  // 单点登录服务器地址
  sso: {
    host: 'https://siamuat.gz.cvte.cn'
  },
  // 是否开启单点登录
  loginWith4A: {{loginWith4A}},
  // 4A 单点登录配置
  op: {
    host: 'https://op-fat.cvte.com',
    appId: '6d09def680a2499aa2d179565fb4a3ed'
  },
  // 是否门户单点登录
  loginWithOp: {{loginWithOp}},
  // 是否本地开发
  loginForDev: {{loginForDev}},
  // 本地开发模拟域账号
  loginVirtualUsername: 'admin',

  // iac 配置，这里给了个测试用的
  iac: {
    use: true,
    url: process.env['iac.url'] || 'https://itapis.cvte.com/iac/app/access_token',
    appId: process.env['iac.appId'] || '001ad210-7379-4001-b670-9337a283a8d9',
    appSecret: process.env['iac.appSecret'] || '001f64ec-3c17-4ead-83e3-b2aa056be2a1'
  },

  // 标志是否默认开启 node 端请求校验
  requestAuthCheck: {{requestAuthCheck}},

  // 是否开启 CSRF token 校验
  needCSRF: {{needCSRF}},

  // redis 配置
  redis: {
    host: process.env['redis.host'] || '10.10.12.25',
    port: process.env['redis.port'] || '6380',
    password: process.env['redis.password'] || '',
    database: process.env['redis.database'] || 0,
    prefix: process.env['redis.prefix'] || 'csb'
  },

  // cookie 中的 token 命名
  tokenName: 'x-auth-token',

  // token 过期时间
  tokenTime: 24 * 60 * 60,

  // 用户鉴权相关配置
  auth: {
    url: process.env['auth.url'] || 'http://172.17.84.90:8005/legox/admin/v1',
    login: process.env['auth.login'] || '/auth/login',
    logout: process.env['auth.logout'] || '/auth/logout',
    me: process.env['auth.me'] || '/auth/me',
    cipherKey: process.env['auth.cipherKey'] || '1234567890123456',
    multiOrg: process.env['auth.multiOrg'] || 'false',
    meInfo: process.env['auth.meInfo'] || '/auth/me_info',
  },

  // jwt 服务
  jwt: {
    url: process.env['jwt.url'] || 'https://csb-api.gz.cvte.cn/csb-jwt',
    token: process.env['jwt.token'] || '/v1/token',
    refresh: process.env['jwt.refresh'] || '/v1/token_refresh',
  },

  // api 配置
  cirapi: ((plugins) => {
    const cirapi = {};
    for (const plugin of plugins) {
      cirapi[plugin] = { url: process.env['cirapi.' + plugin] };
    }
    return cirapi
  })([
    'antdframe',
    'dictionary',
    'menumanager',
    'organization',
    'rolemanager',
    'snm',
    'anm',
    'usermanager',
    'posiManager',
    'workflow',
    'viewManager',
    'viewTemplate',
    'interfaceManager'
  ]),
  biz: {
    commonApi: process.env['biz.sys.center'] + process.env['biz.sys.common.api'],
    signLicense: process.env['sign.license']
  },
  baseUrl: process.env['api.baseUrl'] || 'http://172.17.84.90:8005/legox/admin/v1',
  systemId: process.env['systemId'] || '', // 用于区分系统
  appId: process.env['appId'], // 用于区分域，如商务域
  isSingleLoad: process.env['isSingleLoad'] || 'false', // 是否单体加载
  noAuthKey: []
};