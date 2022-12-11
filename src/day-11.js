#!/usr/bin/env node
const {log, readLines, prod, sort, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  11 * *
 * * * * * * * */

const input = readLines('../inputs/11.txt');

let monkeys = {};

for (let i = 0; i < input.length; i++) {
    let [key] = input[i++].toLowerCase().split(/:\s*/g);
    let [, start] = input[i++].split(/:\s*/g);
    let [, op] = input[i++].split(/new = /g);
    let [, test] = input[i++].split(/divisible by /g);
    let [, positive] = input[i++].split(/throw to /g);
    let [, negative] = input[i++].split(/throw to /g);
    monkeys[key] = {
        start: start.split(/,\s*/g).map(toNumber),
        operation: new Function('old', 'return ' + op),
        test: Number(test),
        posKey: positive,
        negKey: negative,
    };
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const common_multiplier = prod(Object.values(monkeys).map(m => m.test));

function turn(key, div) {
    const {bag, operation, test, posKey, negKey} = monkeys[key];
    while (bag.length) {
        monkeys[key].inspections++;
        const worry = Math.floor(operation(bag.shift()) / div) % common_multiplier;
        monkeys[(worry % test === 0) ? posKey : negKey].bag.push(worry)
    }
}

function round(div) {
    for (let key in monkeys) {
        turn(key, div);
    }
}

function playMonkeyBusiness(div, rounds) {
    for (let key in monkeys) {
        monkeys[key].bag = monkeys[key].start.slice();
        monkeys[key].inspections = 0;
    }
    for (let i = 0; i < rounds; i++) {
        round(div);
    }
    let [max1, max2] = sort(Object.values(monkeys).map(x => x.inspections), true);
    return max1 * max2;
}

log('solution #1:', playMonkeyBusiness(3, 20));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', playMonkeyBusiness(1, 10000));
