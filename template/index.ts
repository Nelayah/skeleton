import * as chalk from 'chalk';
import * as R from 'ramda';
import * as config from './config.json';

const list = key => {
	const data = config[key];
	console.log(`${chalk['yellow']('option: ' + data.name)}\n - ${data.desc}\n - install command: skeleton -s ${data.keyword}\n`);
}
export default () => {
	console.log(chalk['yellow']('\n可提供脚手架清单：\n'))
	R.pipe(
		R.keys,
		R.forEach(list)
	)(config);
}