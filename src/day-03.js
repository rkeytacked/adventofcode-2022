#!/usr/bin/env node
const {log, sum, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  03 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/03.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function toPrio(char) {
    return char <= "Z" ? char.charCodeAt(0) - "A".charCodeAt(0) + 27 : char.charCodeAt(0) - "a".charCodeAt(0) + 1;
}

function findCommon2(rucksack1, rucksack2) {
    const common = {};
    for (let c of rucksack1) {
        common[c] = 1;
    }
    for (let c of rucksack2) {
        if (common[c]) {
            return c;
        }
    }
}

const singles = lines.map(arr => findCommon2(arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)));

log('solution #1', sum(singles.map(toPrio)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function findCommon3(rucksack1, rucksack2, rucksack3) {
    const common = {};
    for (let c of rucksack1) {
        common[c] = 1;
    }
    for (let c of rucksack2) {
        common[c] = common[c] && 2;
    }
    for (let c of rucksack3) {
        if (common[c] === 2) {
            return c;
        }
    }
}

const groups = [];
for (let i = 0; i < lines.length; i += 3) {
    groups.push(findCommon3(lines[i], lines[i + 1], lines[i + 2]))
}

log('solution #2', sum(groups.map(toPrio)));