#!/usr/bin/env node
const {log, min, max, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  23 * *
 * * * * * * * */

const input = readCharArrays('../inputs/23.txt');

function mapToElves() {
    return input.flatMap((line, y) => line.map((field, x) => field === '#' && {x, y}).filter(x => x));
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function countEmptyTiles(elves) {
    let x1 = min(elves.map(({x}) => x));
    let x2 = max(elves.map(({x}) => x));
    let y1 = min(elves.map(({y}) => y));
    let y2 = max(elves.map(({y}) => y));
    return (x2 - x1 + 1) * (y2 - y1 + 1) - elves.length;
}

function spread(elves, rounds = undefined) {
    let positions = {};
    elves.forEach(elf => positions[elf.x + ':' + elf.y] = elf);

    function checkPos(x, y) {
        return !positions[x + ':' + y];
    }

    function lookAround({x, y}) {
        return checkPos(x - 1, y - 1) && checkPos(x, y - 1) && checkPos(x + 1, y - 1)
            && checkPos(x - 1, y) && checkPos(x + 1, y)
            && checkPos(x - 1, y + 1) && checkPos(x, y + 1) && checkPos(x + 1, y + 1);
    }

    function lookNorth({x, y}) {
        return checkPos(x, y - 1) && checkPos(x - 1, y - 1) && checkPos(x + 1, y - 1) && {x, y: y - 1};
    }

    function lookSouth({x, y}) {
        return checkPos(x, y + 1) && checkPos(x - 1, y + 1) && checkPos(x + 1, y + 1) && {x, y: y + 1};
    }

    function lookWest({x, y}) {
        return checkPos(x - 1, y) && checkPos(x - 1, y - 1) && checkPos(x - 1, y + 1) && {x: x - 1, y};
    }

    function lookEast({x, y}) {
        return checkPos(x + 1, y) && checkPos(x + 1, y - 1) && checkPos(x + 1, y + 1) && {x: x + 1, y};
    }

    let consideredDirections = [lookNorth, lookSouth, lookWest, lookEast];
    let targets;
    for (let i = 0; rounds === undefined || i < rounds; i++) {
        targets = {};
        for (let elf of elves) {
            if (lookAround(elf)) {
                continue;
            }
            for (let consider of consideredDirections) {
                let target = consider(elf);
                if (target) {
                    elf.target = target;
                    targets[target.x + ':' + target.y] = (targets[target.x + ':' + target.y] || 0) + 1;
                    break;
                }
            }
        }
        if (rounds === undefined && !Object.keys(targets).length) {
            rounds = i+1;
            break;
        }
        for (let elf of elves) {
            let target = elf.target;
            if (target && targets[target.x + ':' + target.y] === 1) {
                delete positions[elf.x + ':' + elf.y];
                elf.x = target.x;
                elf.y = target.y;
                positions[elf.x + ':' + elf.y] = elf;
            }
            delete elf.target;
        }
        consideredDirections.push(consideredDirections.shift());
    }
    return rounds;
}

let elves = mapToElves();
spread(elves, 10);
log('solution #1:', countEmptyTiles(elves));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2', spread(mapToElves()));
