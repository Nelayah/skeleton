"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const shell = require("shelljs");
const inquirer = require("inquirer");
const log = v => console.log(chalk['green'](`\n${v}\n`));
const defaultGitUrl = 'git@combine.gz.cvte.cn:cir-modules/csb.git';
let spinner;
const startLoading = (v = '努力处理中... (•̀ᴗ•́)و\n') => {
    // @ts-ignore
    spinner = ora(v).start();
};
const sucLoading = () => {
    console.log('\n');
    spinner.succeed('success ٩(ˊᗜˋ*)و \n');
};
const failLoading = () => {
    console.log('\n');
    spinner.fail('fail _(¦3」∠)_  \n');
};
const tips = `
【注意事项】
脚手架初始化前，请阅读以下内容：
1、请确保拥有 gitlab 上 csb 项目访问权限
2、在 http://conf.gz.cvte.cn 配置中心初始化配置
3、如要开通单点登录功能，请提前找运维进行域名授权
`;
const npmQ = [
    {
        type: 'input',
        name: 'name',
        message: "pkg.name:",
        default: () => 'csb'
    },
    {
        type: 'input',
        name: 'version',
        message: "pkg.version:",
        default: () => '1.0.0'
    },
    {
        type: 'input',
        name: 'description',
        message: "pkg.description:",
        default: () => 'CSB whole project with CIR (CVTE IT Rocket)'
    },
    {
        type: 'input',
        name: 'repositoryUrl',
        message: "repository.url - 设置该项将更改 origin master 配置:",
        default: () => defaultGitUrl
    }
];
const apolloQ = [
    {
        type: 'input',
        name: 'namespaceName',
        message: "namespaceName:",
        default: () => '[\'dept1.sign\', \'frontconf\']'
    },
    {
        type: 'input',
        name: 'clusterName',
        message: "clusterName:",
        default: () => 'default'
    },
    {
        type: 'input',
        name: 'appId',
        message: "appId:",
        default: () => 'S75PqGyA'
    },
    {
        type: 'input',
        name: 'clientIp',
        message: "clientIp:"
    }
];
const serverQ = [
    {
        type: 'input',
        name: 'systemName',
        message: "systemName:",
        default: () => 'csb'
    },
    {
        type: 'input',
        name: 'domain',
        message: "domain:",
        default: () => 'http://splendour.cvteapi.com'
    },
    {
        type: 'confirm',
        message: '是否门户单点登录',
        name: 'loginWith4A'
    },
    {
        type: 'confirm',
        message: '是否门户单点登录',
        name: 'loginWithOp'
    },
    {
        type: 'confirm',
        message: '是否本地开发',
        name: 'loginForDev'
    },
    {
        type: 'confirm',
        message: '标志是否默认开启 node 端请求校验',
        name: 'requestAuthCheck'
    },
    {
        type: 'confirm',
        message: '是否开启 CSRF token 校验',
        name: 'needCSRF'
    }
];
class Script {
    constructor() {
        this.dir = undefined;
        this.git = 'git@gitlab.gz.cvte.cn:it-frontend/csb.git';
        // * 1.克隆 csb 项目
        this.gitClone = () => {
            log(`git clone ${this.git} csb...`);
            startLoading();
            shell.exec(`git clone ${this.git} csb && cd csb && ls`, code => {
                if (code !== 0) {
                    failLoading();
                    return log('执行 git clone 命令过程中如遇到权限问题，请联系管理员开通项目权限。');
                }
                sucLoading();
                this.initPkg();
            });
        };
        // * 2.初始化 package.json 和修改 git config
        this.initPkg = () => {
            shell.cd('csb');
            log('initialize package.json...');
            this.dir = shell.pwd().stdout;
            const pkgDir = `${this.dir}/package.json`;
            let pkg = require(pkgDir);
            inquirer.prompt(npmQ).then(answers => {
                log(JSON.stringify(answers, null, '  '));
                pkg.repository.url = answers.repositoryUrl;
                delete answers.repositoryUrl;
                delete answers.isConfirm;
                pkg = Object.assign({}, pkg, answers);
                fs.writeFileSync(pkgDir, JSON.stringify(pkg, null, 2));
                if (pkg.repository.url !== defaultGitUrl) {
                    log(`正在更改 git remote origin 配置...`);
                    shell.exec(`git remote add next ${pkg.repository.url} && git remote remove origin && git remote rename next origin`, code => {
                        if (code !== 0)
                            return log('修改 origin master 分支发生错误');
                        log(`修改结果如下:`);
                        shell.exec(`git remote -v`);
                        this.installPkg();
                    });
                }
                else {
                    this.installPkg();
                }
            });
        };
        // * 3.npm install
        this.installPkg = () => {
            log(`npm install...`);
            startLoading();
            shell.exec('npm install', code => {
                if (code !== 0) {
                    failLoading();
                    return log('npm install error');
                }
                sucLoading();
                this.initApolloConfig();
            });
        };
        // * 4.apollo config init
        this.initApolloConfig = () => {
            log('开始初始化 apollo 配置...');
            inquirer.prompt(apolloQ).then(answers => {
                log(JSON.stringify(answers, null, '  '));
                const tpl = fs.readFileSync(path.join(__dirname, 'file/startup.tpl'), 'utf8');
                const newTpl = tpl.replace(/\{\{([^\}]+)\}\}/g, (match, key) => answers[key.trim()] || '');
                fs.writeFileSync(path.join(this.dir, 'startup.js'), newTpl);
                this.initServer();
            });
        };
        // * 5.server.js init
        this.initServer = () => {
            log('开始初始化 server.js 配置...');
            inquirer.prompt(serverQ).then(answers => {
                log(JSON.stringify(answers, null, '  '));
                const tpl = fs.readFileSync(path.join(__dirname, 'file/server.tpl'), 'utf8');
                const newTpl = tpl.replace(/\{\{([^\}]+)\}\}/g, (match, key) => {
                    if (answers[key.trim()] === '')
                        return '';
                    return answers[key.trim()] || false;
                });
                fs.writeFileSync(path.join(this.dir, 'config/server.js'), newTpl);
                this.success();
            });
        };
        // * 6.success
        this.success = () => {
            // shell.exec(`node ${path.join(__dirname, 'file/success/index.js')}`);
            log(`配置已完成`);
            log(`Enjoy yourself!`);
        };
    }
    init() {
        inquirer.prompt([{
                type: 'confirm',
                name: 'isConfirm',
                message: tips
            }]).then(answers => {
            if (answers.isConfirm)
                this.gitClone();
        });
        // this.initPkg();
        // this.installPkg();
        // this.initApolloConfig();
        // this.initServer();
        // this.success();
    }
}
exports.default = new Script();
