#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cmd = require("commander");
const pkg = require("../package.json");
const template_1 = require("../template");
cmd
    .version(pkg.version)
    .option('-s, --skeleton <template>', '选择要初始化的脚手架 - choose the skeleton which one you want to init');
cmd
    .command('list')
    .description('脚手架列表')
    .action(template_1.default);
cmd.parse(process.argv);
// 初始化脚本命令
switch (cmd.skeleton) {
    case 'csb':
        require('../scripts/csb').default.init();
        break;
}
