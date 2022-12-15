#!/usr/bin/env node
const {log, readLines, min, max, split, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  14 * *
 * * * * * * * */

const input = readLines('../inputs/14.txt', split(' -> ', split(',', toNumber)));
let maxY = max(input.flatMap(r => r.map(([, y]) => y)));

const filled = {};

function fill(x, y, char) {
    filled[x + ':' + y] = char;
}

function fillLine(x1, y1, x2, y2, char) {
    let dirX = Math.sign(x2 - x1);
    let dirY = Math.sign(y2 - y1);
    let x = x1, y = y1;
    for (; x !== x2 || y !== y2; x += dirX, y += dirY) {
        fill(x, y, char);
    }
    fill(x, y, char);
}

for (let rock of input) {
    while (rock.length > 1) {
        let [[x1, y1], [x2, y2]] = rock;
        fillLine(x1, y1, x2, y2, '#');
        rock.shift();
    }
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function isFilled(x, y) {
    return filled[x + ':' + y];
}

function putSand(x, y, maxY) {
    if (isFilled(x, y)) {
        return false;
    }
    while (y <= maxY) {
        if (!isFilled(x, y + 1)) {
            y++;
            continue;
        }
        if (!isFilled(x - 1, y + 1)) {
            x--;
            y++;
            continue;
        }
        if (!isFilled(x + 1, y + 1)) {
            x++;
            y++;
            continue;
        }
        fill(x, y, 'o');
        return true;
    }
    return false;
}

function countCanPutGrains(startX, startY, maxY) {
    let grains = 0;
    while (putSand(startX, startY, maxY)) {
        grains++;
    }
    return grains;
}

let grains1 = countCanPutGrains(500, 0, maxY);
log('solution #1', grains1);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

fillLine(-2 * maxY, maxY + 2, 500 + 2 * maxY, maxY + 2, '_');

let grains2 = countCanPutGrains(500, 0, maxY + 2);
log('solution #2', grains1 + grains2);
