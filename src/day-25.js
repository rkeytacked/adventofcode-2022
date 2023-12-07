#!/usr/bin/env node
const {log, readLines, sum} = require("./common");

/* * * * * * * *
 * * DAY  25 * *
 * * * * * * * */

const input = readLines('../inputs/25.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const snafu = {
    "=": -2,
    "-": -1,
    "0": 0,
    "1": 1,
    "2": 2,
    "3": '=',
    "4": '-',
};

function parseSnafu(nr) {
    return [...nr].reduce((value, char) => 5 * value + snafu[char], 0);
}

function toSnafu(nr) {
    return nr ? toSnafu(Math.floor((nr + 2) / 5)) + snafu[nr % 5] : '';
}

log('solution #1:', toSnafu(sum(input.map(parseSnafu))));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2: merry X-mas');