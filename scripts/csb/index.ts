import * as fs from 'fs';
import * as path from 'path';
import * as ora from 'ora';
import * as chalk from 'chalk';
import * as shell from 'shelljs';
import * as inquirer from 'inquirer';

const log = v => console.log(chalk['green'](`\n${v}\n`));
const defaultGitUrl = 'git@combine.gz.cvte.cn:cir-modules/csb.git';
let spinner;
const startLoading = (v = '努力处理中... (•̀ᴗ•́)و\n') => {
  // @ts-ignore
  spinner = ora(v).start();
}
const sucLoading = () => {
  console.log('\n');
  spinner.succeed('success ٩(ˊᗜˋ*)و \n');
}
const failLoading = () => {
  console.log('\n');
  spinner.fail('fail _(¦3」∠)_  \n');
}

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


class Script {
  private dir = undefined;
  private git = 'git@gitlab.gz.cvte.cn:it-frontend/csb.git';
  // * 1.克隆 csb 项目
  private gitClone = () => {
    log(`git clone ${this.git} csb...`)
    startLoading();
    shell.exec(`git clone ${this.git} csb && cd csb && ls`, code => {
      if (code !== 0) {
        failLoading();
        return log('执行 git clone 命令过程中如遇到权限问题，请联系管理员开通项目权限。');
      }
      sucLoading();
      this.initPkg();
    });
  }
  // * 2.初始化 package.json 和修改 git config
  private initPkg = () => {
    shell.cd('csb');
    log('initialize package.json...')
    this.dir = shell.pwd().stdout;
    const pkgDir =`${this.dir}/package.json`;
    let pkg = require(pkgDir);
    inquirer.prompt(npmQ).then(answers => {
      log(JSON.stringify(answers, null, '  '));
      pkg.repository.url = answers.repositoryUrl;
      delete answers.repositoryUrl;
      pkg = {...pkg, ...answers};
      fs.writeFileSync(pkgDir, JSON.stringify(pkg, null, 2));
      if (pkg.repository.url !== defaultGitUrl) {
        log(`正在更改 git remote origin 配置...`);
        shell.exec(`git remote add next ${pkg.repository.url} && git remote remove origin && git remote rename next origin`, code => {
          if (code !== 0) return log('修改 origin master 分支发生错误');
          log(`修改结果如下:`)
          shell.exec(`git remote -v`);
          this.installPkg();
        })
      } else {
        this.installPkg();
      }
      
    });
  }
  // * 3.npm install
  private installPkg = () => {
    log(`npm install...`);
    startLoading();
    shell.exec('npm install', code => {
      if (code !== 0) {
        failLoading();
        return log('npm install error');
      }
      sucLoading();
      this.initApolloConfig();
    })
  }
  // * 4.apollo config init
  private initApolloConfig = () => {
    log('开始初始化 apollo 配置...');
    inquirer.prompt(apolloQ).then(answers => {
      log(JSON.stringify(answers, null, '  '));
      const tpl = fs.readFileSync(path.join(__dirname, 'file/startup.tpl'), 'utf8');
      const newTpl = tpl.replace(/\{\{([^\}]+)\}\}/g, (match, key) => answers[key.trim()] || match);
      console.log(newTpl);
    });
    
  }
  init() {
    // this.gitClone();
    // this.initPkg();
    // this.installPkg();
    this.initApolloConfig();
  }
}

export default new Script();