'use strict';

const apolloClient = require('@cvte/apollo-node-client');

const runType = process.env.RUN_TYPE || 'dev';
const configEnv = process.env.CONFIG_ENV || 'dev';
const configDomain = configEnv === 'prod' ? 'https://apollo.gz.cvte.cn' : `https://apollo-${configEnv}.gz.cvte.cn`;

const apolloConfig = {
  configServerUrl: configDomain,
  namespaceName: {{namespaceName}},
  clusterName: '{{clusterName}}',
  appId: '{{appId}}',
  clientIp: '{{clientIp}}'
};

console.log('loading apollo config...');
/** 阿波罗配置，靠后配置会覆盖靠前相同内容 */
const apolloConfigs = [
  apolloConfig
];

Promise.all(apolloConfigs.map(item => apolloClient.getRemoteConfig(item))).then(resp => {
  console.log('loaded resp');
  console.log(resp);
  const data = {};
  resp.forEach(item => {
    Object.assign(data, item)
  });
  console.log('assign resp')
  console.log(data);
  apolloClient.createEnvFile(data);
  apolloClient.setEnv();
  if (runType === 'dev') {
    require('@cvte/cir-framework/_server_src');
  } else {
    require('@cvte/cir-framework/_server_src/webpack.dev.server.js');
  }
});
