#!/usr/bin/env node
const {log, readLines, split,} = require("./common");

/* * * * * * * *
 * * DAY  21 * *
 * * * * * * * */

const input = readLines('../inputs/21.txt', split(': '));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const monkeys = {};

input.forEach(([name, expr]) => {
    let [a, op, b] = expr.split(' ');
    monkeys[name] = new Function(op ? `return this.${a}() ${op} this.${b}()` : `return ${a}`);
});

log('solution #1:', monkeys.root());


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function compute(x, op, y) {
    if (typeof x === 'number' && typeof y === 'number') {
        return eval(x + op + y);
    }
    return [x, op, y];
}

input.forEach(([name, expr]) => {
    let [a, op, b] = expr.split(' ');
    if (name === 'root') {
        monkeys[name] = new Function(`return this.solve(this.${a}(), this.${b}())`);
    } else if (name === 'humn') {
        monkeys[name] = new Function(`return "x"`);
    } else if (op) {
        monkeys[name] = new Function(`return this.compute(this.${a}(), "${op}", this.${b}())`);
    } else {
        monkeys[name] = new Function(`return ${a}`);
    }
});

function solveEquation(a, b) {
    if (typeof a === 'number') {
        let x = a;
        a = b;
        b = x;
    }
    while (typeof a !== 'string') {
        let [x, op, y] = a;
        if (op === '+') {
            [a, b] = typeof x === 'number' ? [y, b - x] : [x, b - y];
        } else if (op === '-') {
            [a, b] = typeof x === 'number' ? [y, x - b] : [x, b + y];
        } else if (op === '*') {
            [a, b] = typeof x === 'number' ? [y, b / x] : [x, b / y];
        } else if (op === '/') {
            [a, b] = typeof x === 'number' ? [y, x / b] : [x, b * y];
        } else {
            throw new Error("unknown operation " + op);
        }
    }
    return b;
}

monkeys.solve = solveEquation;
monkeys.compute = compute;

log('solution #2', monkeys.root());
