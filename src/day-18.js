#!/usr/bin/env node
const {log, readLines, toNumber,} = require("./common");

/* * * * * * * *
 * * DAY  18 * *
 * * * * * * * */

const input = new Set(readLines('../inputs/18.txt'))

function serialize(x, y, z) {
    return `${x},${y},${z}`;
}

function deserialize(point) {
    return point.split(',').map(toNumber);
}


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const DIRECT6 = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];

function forNeighbors(point, neighbors, action) {
    let [x, y, z] = deserialize(point);
    for (let [dx, dy, dz] of neighbors) {
        action(serialize(x + dx, y + dy, z + dz));
    }
}

let emptySides = 0;
for (let rock of input) {
    forNeighbors(rock, DIRECT6, p => input.has(p) || emptySides++);
}

log('solution #1', emptySides);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const ALL26 = [[-1, 0, 0], [1, 0, 0],
    [0, -1, 0], [-1, -1, 0], [1, -1, 0],
    [0, 1, 0], [-1, 1, 0], [1, 1, 0],
    [0, 0, -1], [-1, 0, -1], [1, 0, -1],
    [0, -1, -1], [-1, -1, -1], [1, -1, -1],
    [0, 1, -1], [-1, 1, -1], [1, 1, -1],
    [0, 0, 1], [-1, 0, 1], [1, 0, 1],
    [0, -1, 1], [-1, -1, 1], [1, -1, 1],
    [0, 1, 1], [-1, 1, 1], [1, 1, 1]];

const airFields = new Set();
for (let rock of input) {
    forNeighbors(rock, ALL26, p => input.has(p) || airFields.add(p));
}

function findLeftMostAir() {
    let minX = 1000;
    let result;
    for (let point of airFields) {
        const [x] = deserialize(point);
        if (x < minX) {
            minX = x;
            result = point;
        }
    }
    return result;
}

let border = new Set();
for (const toVisit = [findLeftMostAir()]; toVisit.length;) {
    forNeighbors(toVisit.pop(), DIRECT6, p => {
        if (airFields.has(p) && !border.has(p)) {
            border.add(p);
            toVisit.push(p)
        }
    });
}

let outerSides = 0;
for (let rock of input) {
    forNeighbors(rock, DIRECT6, p => border.has(p) && outerSides++);
}

log('solution #2', outerSides);
