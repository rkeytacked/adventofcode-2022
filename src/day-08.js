#!/usr/bin/env node
const {log, max, readLines, split, sum, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  08 * *
 * * * * * * * */
let input = readLines('../inputs/08.txt', split('', toNumber));
let sizeY = input.length;
let sizeX = input[0].length;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let visible = [];

for (let x = 0; x < sizeX; x++) {
    let maxTreeDown = -1;
    let maxTreeUp = -1;
    for (let y = 0, _y = sizeY - 1; y < sizeY; y++, _y--) {
        visible[y] = visible[y] || [];
        visible[_y] = visible[_y] || [];
        visible[y][x] = visible[y][x] || 0;
        if (input[y][x] > maxTreeDown) {
            maxTreeDown = input[y][x];
            visible[y][x] = 1;
        }
        if (input[_y][x] > maxTreeUp) {
            maxTreeUp = input[_y][x];
            visible[_y][x] = 1;
        }
    }
}

for (let y = 0; y < sizeY; y++) {
    let maxTreeRight = -1;
    let maxTreeLeft = -1;
    for (let x = 0, _x = sizeX - 1; x < sizeX; x++, _x--) {
        if (input[y][x] > maxTreeRight) {
            maxTreeRight = input[y][x];
            visible[y][x] = 1;
        }
        if (input[y][_x] > maxTreeLeft) {
            maxTreeLeft = input[y][_x];
            visible[y][_x] = 1;
        }
    }
}

log('solution #1:', sum(visible.map(sum)));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let scores = [];
for (let y = 0; y < sizeY; y++) {
    scores[y] = [];
    for (let x = 0; x < sizeX; x++) {
        let left = 0;
        for (let i = x - 1; i >= 0; i--) {
            left++
            if (input[y][i] >= input[y][x]) break;
        }
        let right = 0;
        for (let i = x + 1; i < sizeX; i++) {
            right++;
            if (input[y][i] >= input[y][x]) break;
        }
        let up = 0;
        for (let i = y - 1; i >= 0; i--) {
            up++;
            if (input[i][x] >= input[y][x]) break;
        }
        let down = 0;
        for (let i = y + 1; i < sizeY; i++) {
            down++;
            if (input[i][x] >= input[y][x]) break;
        }

        scores[y][x] = left * right * up * down;
    }
}

log('solution #2:', max(scores.map(max)));
