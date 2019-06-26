#!/usr/bin/env node

import * as cmd from 'commander';
import * as pkg from '../package.json';
import template from '../template';

cmd
	.version(pkg.version)
  .option('-s, --skeleton <template>', '选择要初始化的脚手架 - choose the skeleton which one you want to init')

cmd
	.command('list')
	.description('脚手架列表')
	.action(template);
	
cmd.parse(process.argv);

// 初始化脚本命令
switch (cmd.skeleton) {
	case 'utils':
		require('../scripts/utils').default.init();
		break;
	case 'react_comp':
    require('../scripts/reactComp').default.init();
    break;
}