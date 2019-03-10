#!/usr/bin/env node

import * as cmd from 'commander';
import * as pkg from '../package.json';
import template from '../template';

cmd
	.version(pkg.version)
  .option('-p, --pineapple', 'Add pineapple')

cmd
	.command('list')
	.description('脚手架列表：')
	.action(template);
	
cmd.parse(process.argv);