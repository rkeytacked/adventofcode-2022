#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  17 * *
 * * * * * * * */

const input = readLines('../inputs/17.txt', x => x, '');

const rocks = [
    ['####'],
    ['.#.', '###', '.#.'],
    ['###', '..#', '..#'],
    ['#', '#', '#', '#'],
    ['##', '##'],
];

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let rock = null;
let rockPosX, rockPosY;

let height = 0, virtualHeight = 0, rockIndex = 0, jetIndex = 0;
let covered = {}, period = null;

function moveRock(dir) {
    for (let y = 0; y < rock.length; y++) {
        for (let x = 0; x < rock[y].length; x++) {
            if (rock[y][x] === '#') {
                let X = rockPosX + dir + x;
                let Y = rockPosY + y;
                if (X < 0 || X > 6 || Y < 0 || covered[X + ':' + Y]) {
                    return false;
                }
            }
        }
    }
    rockPosX += dir;
    return true;
}

function fallRock() {
    for (let y = 0; y < rock.length; y++) {
        for (let x = 0; x < rock[y].length; x++) {
            if (rock[y][x] === '#') {
                let X = rockPosX + x;
                let Y = rockPosY + y - 1;
                if (X < 0 || X > 7 || Y < 0 || covered[X + ':' + Y]) {
                    return false;
                }
            }
        }
    }
    rockPosY--;
    return true;
}

function restRock() {
    for (let y = 0; y < rock.length; y++) {
        for (let x = 0; x < rock[y].length; x++) {
            if (rock[y][x] === '#') {
                let X = rockPosX + x;
                let Y = rockPosY + y;
                covered[X + ':' + Y] = true;
                height = Math.max(height, Y + 1);
            }
        }
    }
}


let patterns = {};

function findPeriod(rockIndex, jetIndex, rockPos) {
    let pattern = (rockIndex % rocks.length) + ':' + (jetIndex % input.length) + ':' + (rockPos);
    if (patterns[pattern]) {
        let p = patterns[pattern];
        let diff = height - p.height;
        if (diff === p.diff) {
            log('repeating pattern found at', pattern, p, {height, rockIndex, jetIndex, rockPos}, '!');
            return period = [p, {height, rockIndex, jetIndex, rockPos}];
        }
        Object.assign(p, {height, diff, rockIndex, jetIndex, rockPos});
    } else {
        patterns[pattern] = {
            height, diff: 0, rockIndex, jetIndex, rockPos
        };
    }
}

function simulateUntil(until) {
    for (rock = null; rockIndex < until; jetIndex++) {
        if (!rock) {
            rock = rocks[rockIndex % rocks.length];
            rockPosX = 2;
            rockPosY = height + 3;
        }
        let jet = input[jetIndex % input.length];
        moveRock(jet === '<' ? -1 : 1);
        if (!fallRock()) {
            restRock();
            let res = period || findPeriod(rockIndex, jetIndex, rockPosX);
            rock = null;
            rockIndex++;
            if (res) {
                let [p1,p2] = period;
                let rest = until - rockIndex;
                let periodLength = p2.rockIndex - p1.rockIndex;
                let insertPeriodCount = Math.floor(rest / periodLength);
                virtualHeight += insertPeriodCount * p1.diff;
                rockIndex += insertPeriodCount * periodLength;
            }
        }
    }
}

simulateUntil(2022);
log('solution #1', height + virtualHeight);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

simulateUntil(1000000000000);
log('solution #2', height + virtualHeight);
