#!/usr/bin/env node
const {log, readLines, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  04 * *
 * * * * * * * */

const lines = readLines('../inputs/04.txt', split(/[,-]/g, toNumber));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let totalOverlaps = lines.filter(([x1, x2, y1, y2]) => x1 <= y1 && x2 >= y2 || x1 >= y1 && x2 <= y2);

log('solution #1', totalOverlaps.length);


/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let partialOverlaps = lines.filter(([x1, x2, y1, y2]) => x1 <= y1 && x2 >= y1 || x1 <= y2 && x2 >= y2 || y1 <= x1 && y2 >= x1 || y1 <= x2 && y2 >= x2);

log('solution #2', partialOverlaps.length);