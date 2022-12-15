#!/usr/bin/env node
const {log, readLines, min, max, split, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  14 * *
 * * * * * * * */

const input = readLines('../inputs/15.txt', split(/[=,:]\s*/g, toNumber));

let sensors = [];
let beacons = {};
for ([, sx, , sy, , bx, , by] of input) {
    sensors.push({
        x: sx,
        y: sy,
        dist: Math.abs(bx - sx) + Math.abs(by - sy)
    });
    beacons[`${bx}:${by}`] = {
        x: bx,
        y: by
    };
}
beacons = Object.values(beacons);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function covered(lineY) {
    let covered = new Set();
    for (let {x, y, dist} of sensors) {
        let range = dist - Math.abs(lineY - y);
        for (let i = 0; i <= range; i++) {
            covered.add(x - i);
            covered.add(x + i);
        }
    }
    for (let {x, y} of beacons) {
        if (y === lineY) {
            covered.delete(x);
        }
    }
    return covered.size;
}

log('solution #1', covered(2000000));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function findEmpty(maxX, maxY) {
    function isEmpty({x, y}) {
        if (x < 0 || x > maxX || y < 0 || y > maxY) {
            return false;
        }
        for (let {x: bx, y: by} of beacons) {
            if (x === bx && y === by) {
                return false;
            }
        }
        for (let {x: sx, y: sy, dist} of sensors) {
            if (Math.abs(x - sx) + Math.abs(y - sy) <= dist) {
                return false;
            }
        }
        return true;
    }

    for (let {x, y, dist} of sensors) {
        for (let i = 0; i < dist + 1; i++) {
            let away = dist + 1 - i;
            for (let pos of [
                {x: x - away, y: y - i},
                {x: x + away, y: y + i},
                {x: x - i, y: y + away},
                {x: x + i, y: y - away}
            ]) {
                if (isEmpty(pos)) {
                    return pos;
                }
            }
        }
    }
}


let pos = findEmpty(4000000, 4000000);
log('solution #2', pos, pos.x * 4000000 + pos.y);
