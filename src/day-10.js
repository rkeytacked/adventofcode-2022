#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  10 * *
 * * * * * * * */

const input = readLines('../inputs/10.txt');

function* operate() {
    let X = 1;
    for (let cmd of input) {
        yield X;
        if (cmd.startsWith("addx")) {
            yield X;
            X += Number(cmd.substring(5));
        }
    }
    yield X;
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let values = [];
let strength = 0;

function increaseStrength(X) {
    values.push(X);
    if (values.length % 40 === 20) {
        strength += values.length * X;
    }
}

[...operate()].map(increaseStrength);

log('solution #1:', strength);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let crt = '';

for (let i = 0; i < values.length; i++) {
    let X = values[i];
    let x = i % 40;
    crt += (X <= x + 1 && X >= x - 1) ? '##' : '  ';
    if (x === 39) {
        log(crt);
        crt = '';
    }
}


log('solution #2:', '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
