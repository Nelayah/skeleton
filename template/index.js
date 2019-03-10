"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const R = require("ramda");
const config = require("./config.json");
const list = key => {
    const data = config[key];
    console.log(` ${chalk['yellow'](data.name)} - ${data.desc} - ${chalk['red']('模板安装包')}`);
};
exports.default = () => {
    console.log('A');
    R.pipe(R.keys, R.forEach(list))(config);
};
