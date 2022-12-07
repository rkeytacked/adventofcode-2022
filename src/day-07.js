#!/usr/bin/env node
const {log, readLines, sum, split, min} = require("./common");

/* * * * * * * *
 * * DAY  07 * *
 * * * * * * * */

const input = readLines('../inputs/07.txt', split(' '));
const totalSizes = {};

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function readSizes() {
    let pwd = [''];
    for (let [x, y, z] of input) {
        if (x === '$') {
            if (y === 'cd') {
                if (z === '/') {
                    pwd = [''];
                } else if (z === '..') {
                    pwd.pop();
                } else {
                    pwd.push(z);
                }
            }
        } else if (x !== 'dir') {
            let path = '';
            for (let dir of pwd) {
                path += dir + '/';
                totalSizes[path] = (totalSizes[path] || 0) + Number(x);
            }
        }
    }
}

readSizes();

let smallSizes = Object.values(totalSizes).filter(x => x <= 100000)
log('solution #1', sum(smallSizes));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let neededSize = totalSizes['/'] - 40000000;

let bigSizes = Object.values(totalSizes).filter(x => x >= neededSize);
log('solution #2', min(bigSizes));