#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cmd = require("commander");
const pkg = require("../package.json");
const template_1 = require("../template");
cmd
    .version(pkg.version)
    .option('-p, --pineapple', 'Add pineapple');
cmd
    .command('list')
    .description('脚手架列表：')
    .action(template_1.default);
cmd.parse(process.argv);
