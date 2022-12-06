#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  06 * *
 * * * * * * * */

const input = readLines('../inputs/06.txt', x => x, '');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function isMarker(arr) {
    return new Set(arr).size === arr.length;
}

function firstMarker(len) {
    let recent = input.slice(0, len);
    for (let i = len; i < input.length; i++) {
        if (isMarker(recent)) {
            return i;
        }
        recent.shift();
        recent.push(input[i]);
    }
}

log('solution #1:', firstMarker(4));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', firstMarker(14));
