import * as fs from 'fs';
import * as chalk from 'chalk';
import * as R from 'ramda';
import * as config from './config.json';

const list = key => {
	const data = config[key];
	console.log(` ${chalk['yellow'](data.name)} - ${data.desc} - ${chalk['red']('模板安装包')}`);
}
export default () => {
	console.log('A');
	R.pipe(
		R.keys,
		R.forEach(list)
	)(config);
}