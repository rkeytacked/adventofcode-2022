#!/usr/bin/env node
const {log, min, readLines, split} = require("./common");

/* * * * * * * *
 * * DAY  12 * *
 * * * * * * * */
let input = readLines('../inputs/12.txt', split(''));

let height = input.length;
let width = input[0].length;

function find(char) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (input[y][x] === char) {
                return {x, y};
            }
        }
    }
}

let startPos = find('S');
let targetPos = find('E');

input[startPos.y][startPos.x] = 'a';
input[targetPos.y][targetPos.x] = 'z';

const levels = input.map(line => line.map(char => char.charCodeAt(0) - "a".charCodeAt(0)));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function goPaths(startPos, canStep) {
    let pathLengths = new Array(height);
    for (let i = 0; i < height; i++) {
        pathLengths[i] = new Array(width);
    }

    let next = [{x: startPos.x, y: startPos.y, len: 0}];

    function stepIfPossible(x, y, toX, toY, len) {
        if (toX >= 0 && toX < width && toY >= 0 && toY < height && canStep(x, y, toX, toY)) {
            next.push({x: toX, y: toY, len: len + 1});
        }
    }

    while (next.length) {
        let {x, y, len} = next.shift();
        if (pathLengths[y][x] !== undefined && pathLengths[y][x] <= len) {
            continue;
        }
        pathLengths[y][x] = len;
        stepIfPossible(x, y, x - 1, y, len);
        stepIfPossible(x, y, x + 1, y, len);
        stepIfPossible(x, y, x, y - 1, len);
        stepIfPossible(x, y, x, y + 1, len);
    }
    return pathLengths;
}

const upwards = goPaths(startPos, (x, y, toX, toY) => levels[toY][toX] <= levels[y][x] + 1);

log('solution #1:', upwards[targetPos.y][targetPos.x]);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const downwards = goPaths(targetPos, (x, y, toX, toY) => levels[toY][toX] >= levels[y][x] - 1);
const targetLengths = downwards.flatMap((line, y) => line.filter((_, x) => levels[y][x] === 0));

log('solution #2:', min(targetLengths));
