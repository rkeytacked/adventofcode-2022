#!/usr/bin/env node
const {log, readLines, sum} = require("./common");

/* * * * * * * *
 * * DAY  13 * *
 * * * * * * * */

const input = readLines('../inputs/13.txt', l => eval(l));

function compare(left, right) {
    if (left instanceof Array) {
        if (right instanceof Array) {
            return compareArrays(left, right);
        } else {
            return compareArrays(left, [right]);
        }
    } else {
        if (right instanceof Array) {
            return compareArrays([left], right);
        } else {
            return Math.sign(left - right);
        }
    }
}

function compareArrays(left, right) {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
        if (i >= left.length) {
            return -1;
        }
        if (i >= right.length) {
            return 1;
        }
        let c = compare(left[i], right[i]);
        if (c !== 0) return c;
    }
    return 0;
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const indicesCorrect = [];
for (let index = 0; index < input.length; index++) {
    if (compare(input[index++], input[index++]) < 0) {
        indicesCorrect.push(Math.ceil(index / 3));
    }
}

log('solution #1', sum(indicesCorrect));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let div1 = [[2]];
let div2 = [[6]];

input.push(div1, div2);
input.sort(compare);

const divIndex1 = 1 + input.indexOf(div1);
const divIndex2 = 1 + input.indexOf(div2);

log('solution #2', divIndex1 * divIndex2);