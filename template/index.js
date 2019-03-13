"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const R = require("ramda");
const config = require("./config.json");
const list = key => {
    const data = config[key];
    console.log(`${chalk['yellow']('option: ' + data.name)}\n - ${data.desc}\n - install command: skeleton -s ${data.keyword}\n`);
};
exports.default = () => {
    console.log(chalk['yellow']('\n可提供脚手架清单：\n'));
    R.pipe(R.keys, R.forEach(list))(config);
};
