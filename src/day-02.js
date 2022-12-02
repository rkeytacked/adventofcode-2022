#!/usr/bin/env node
const {log, readLines, split, sum} = require("./common");

/* * * * * * * *
 * * DAY  02 * *
 * * * * * * * */

const lines = readLines('../inputs/02.txt', split(' '));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const outcome1 = ([first, second]) => {
    switch (first) {
        case 'A':
            return second === 'X' ? 3 + 1 : second === 'Y' ? 6 + 2 : 3;
        case 'B':
            return second === 'Y' ? 3 + 2 : second === 'Z' ? 6 + 3 : 1;
        case 'C':
            return second === 'Z' ? 3 + 3 : second === 'X' ? 6 + 1 : 2;
    }
};

const scores1 = lines.map(outcome1);
log('solution #1', sum(scores1));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const outcome2 = ([first, second]) => {
    switch (first) {
        case 'A':
            return second === 'Z' ? 6 + 2 : second === 'Y' ? 3 + 1 : 3;
        case 'B':
            return second === 'Z' ? 6 + 3 : second === 'Y' ? 3 + 2 : 1;
        case 'C':
            return second === 'Z' ? 6 + 1 : second === 'Y' ? 3 + 3 : 2;
    }
};

let scores2 = lines.map(outcome2);
log('solution #2', sum(scores2));
