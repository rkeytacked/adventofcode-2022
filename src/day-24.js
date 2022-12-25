#!/usr/bin/env node
const {log, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  24 * *
 * * * * * * * */

const input = readCharArrays('../inputs/24.txt');
let height = input.length - 2;
let width = input[0].length - 2;

const blizzards = input.flatMap((line, y) => line.map((field, x) => {
    switch (field) {
        case '>':
            return {dx: 1, dy: 0, x: x - 1, y: y - 1};
        case '<':
            return {dx: -1, dy: 0, x: x - 1, y: y - 1};
        case 'v':
            return {dx: 0, dy: 1, x: x - 1, y: y - 1};
        case '^':
            return {dx: 0, dy: -1, x: x - 1, y: y - 1};
    }
})).filter(b => b);

let start = {x: 0, y: -1};
let goal = {x: width - 1, y: height};

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function walk(start, goal) {
    let positions = [start];
    for (let time = 1; true; time++) {
        let nextOccupied = new Set();
        for (const B of blizzards) {
            B.x = (B.x + width + B.dx) % width;
            B.y = (B.y + height + B.dy) % height;
            nextOccupied.add(B.x + ':' + B.y);
        }
        let nextPositions = [start];
        let nextGoneTo = new Set();

        function goTo(x, y) {
            if (nextGoneTo.has(x + ':' + y)) return;
            if (x === goal.x && y === goal.y) {
                return true;
            }
            if (x >= 0 && x < width && y >= 0 && y < height && !nextOccupied.has(x + ':' + y)) {
                nextPositions.push({x, y});
                nextGoneTo.add(x + ':' + y);
            }
        }

        for (let {x, y} of positions) {
            if (goTo(x, y)) return time;
            if (goTo(x + 1, y)) return time;
            if (goTo(x - 1, y)) return time;
            if (goTo(x, y + 1)) return time;
            if (goTo(x, y - 1)) return time;
        }

        positions = nextPositions;
    }
}


const trip = walk(start, goal);

log('solution #1:', trip);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const tripBack = walk(goal, start);
const tripAgain = walk(start, goal);

log('solution #2:', trip + tripBack + tripAgain);
