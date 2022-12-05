#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  05 * *
 * * * * * * * */

const input = readLines('../inputs/05.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let stacks = {}

function fillStacks(line) {
    for (let i = 1; i < line.length; i += 4) {
        let c = line[i];
        if (c === "1") {
            header = false;
            return;
        }
        let nr = (i + 3) / 4;
        stacks[nr] = (stacks[nr] || []);
        if (c !== ' ') {
            stacks[nr].unshift(c);
        }
    }
}

function moveStacks_CrateOperator9000(line) {
    let parts = line.split(' ');
    if (parts[0] === 'move') {
        for (let i = Number(parts[1]); i > 0; i--) {
            stacks[parts[5]].push(stacks[parts[3]].pop());
        }
    }
}

let header = true;
for (let line of input) {
    if (header) {
        fillStacks(line)
    } else {
        moveStacks_CrateOperator9000(line);
    }
}

const tops1 = Object.values(stacks).map(s => s.pop()).join('');
log('solution #1', tops1);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

stacks = {}

function moveStacks_CrateOperator9001(line) {
    let parts = line.split(' ');
    if (parts[0] === 'move') {
        let count = Number(parts[1]);
        stacks[parts[5]].push(...stacks[parts[3]].splice(-count, count));
    }
}

header = true;
for (let line of input) {
    if (header) {
        fillStacks(line)
    } else {
        moveStacks_CrateOperator9001(line);
    }
}

const tops2 = Object.values(stacks).map(s => s.pop()).join('');
log('solution #2', tops2);