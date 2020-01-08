"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const shell = require("shelljs");
const inquirer = require("inquirer");
const log = v => console.log(chalk['green'](`\n${v}\n`));
let spinner;
const startLoading = (v = 'loading... (•̀ᴗ•́)و\n') => {
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
Initialize a empty project to develop a react components?
`;
class Script {
    constructor() {
        this.dir = undefined;
        this.copy = () => {
            startLoading();
            shell.exec(`cp -rf ${path.join(__dirname, './template')} ${this.dir}/reactComp`, code => {
                if (code !== 0) {
                    failLoading();
                    return log('copy fail');
                }
                sucLoading();
            });
        };
    }
    init() {
        inquirer.prompt([{
                type: 'confirm',
                name: 'isConfirm',
                message: tips
            }]).then(answers => {
            this.dir = shell.pwd().stdout;
            if (answers.isConfirm)
                this.copy();
        });
    }
}
exports.default = new Script();
