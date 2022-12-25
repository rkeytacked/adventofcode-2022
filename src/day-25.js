#!/usr/bin/env node
const {
    log,
    associate,
    readCharArrays,
    readLines,
    readSingletonMaps,
    split,
    sum,
    toNumber,
    min,
    max,
    sort,
    prod,
    median
} = require("./common");

/* * * * * * * *
 * * DAY  25 * *
 * * * * * * * */

const input = readLines('../inputs/25.txt');
const snafu = {
    "2": 2,
    "1": 1,
    "0": 0,
    "-": -1,
    "=": -2,
};

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function parseSnafu(nr) {
    let value = 0;
    for (let char of nr) {
        value = 5 * value + snafu[char];
    }
    return value;
}

function toSnafu(nr) {
    if (!nr) return '0';
    let string = '';
    while (nr > 0) {
        let remainder = nr % 5;
        switch (remainder) {
            case 0:
            case 1:
            case 2:
                string = remainder + string;
                nr = (nr - remainder) / 5;
                break;
            case 3:
                string = "=" + string;
                nr = (nr + 2) / 5;
                break;
            case 4:
                string = "-" + string;
                nr = (nr + 1) / 5;
                break;
        }
    }
    return string;
}

log('solution #1:', toSnafu(sum(input.map(parseSnafu))));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2: merry X-mas');