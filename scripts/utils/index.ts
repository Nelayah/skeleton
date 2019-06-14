import * as path from 'path';
import * as ora from 'ora';
import * as chalk from 'chalk';
import * as shell from 'shelljs';
import * as inquirer from 'inquirer';

const log = v => console.log(chalk['green'](`\n${v}\n`));
let spinner;
const startLoading = (v = 'loading... (•̀ᴗ•́)و\n') => {
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

const tips = `
Initialize a empty project to develop a utils?
`;

class Script {
  private dir = undefined;
  private copy = () => {
    startLoading();
    shell.exec(`cp -rf ${path.join(__dirname, './template')} ${this.dir}/utils`, code => {
      if (code !== 0) {
        failLoading();
        return log('copy fail');
      }
      sucLoading();
    });
  }
  init() {
    inquirer.prompt([{
      type: 'confirm',
      name: 'isConfirm',
      message: tips
    }]).then(answers => {
      this.dir = shell.pwd().stdout;
      if (answers.isConfirm) this.copy();
    });
  }
}

export default new Script();