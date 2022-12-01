#!/usr/bin/env node
const {log, readLines, toNumber, max} = require("./common");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

let lines = readLines('../inputs/01.txt');
let totals = [0];

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

for(let line of lines) {
    if (line) {
        totals.push(totals.pop(0) + toNumber(line))
    } else {
        totals.push(0)
    }
}

log('solution #1', 'maximum calories', max(totals))

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

totals.sort((x,y) => y - x);

log('solution #2', 'maximum 3 calories', totals[0] + totals[1] + totals[2])