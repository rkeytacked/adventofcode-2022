#!/usr/bin/env node
const {log, readLines, split} = require("./common");

/* * * * * * * *
 * * DAY  22 * *
 * * * * * * * */

const input = readLines('../inputs/22.txt', split(''));
let instruction = input.pop();


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function turnRight([dx, dy]) {
    return [-dy, dx];
}

function turnLeft([dx, dy]) {
    return [dy, -dx];
}

function walkMap(move) {
    let position = [input[0].indexOf('.'), 0];
    let direction = [1, 0];

    let distance = 0;
    for (let step of instruction) {
        switch (step) {
            case 'R':
                move(position, direction, distance);
                distance = 0;
                direction = turnRight(direction);
                break;
            case 'L':
                move(position, direction, distance);
                distance = 0;
                direction = turnLeft(direction);
                break;
            default:
                distance = 10 * distance + Number(step);
        }
    }
    move(position, direction, distance);
    return {position, direction};
}

function move(position, direction, max) {
    for (let i = 0; i < max; i++) {
        let x = position[0] + direction[0];
        let y = position[1] + direction[1];
        if (y < 0 || x < 0 || !input[y][x] || input[y][x] === ' ') {
            for (let [a, b] = position; b >= 0 && a >= 0 && input[b][a] && input[b][a] !== ' ';) {
                x = a;
                y = b;
                a -= direction[0];
                b -= direction[1];
            }
        }
        if (input[y] && input[y][x] === '.') {
            position[0] = x;
            position[1] = y;
        } else {
            break;
        }
    }
}

function dirPoints([x, y], dir) {
    return 1000 * (y + 1) + 4 * (x + 1) + ({'10': 0, '01': 1, '-10': 2, '0-1': 3})[dir.join('')];
}

let {position, direction} = walkMap(move);

log('solution #1:', dirPoints(position, direction));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let edgeLength = (input.length - 1) / 4;

function turn180([dx, dy]) {
    return [-dx, -dy];
}

/**
 * This particular folding comes from this particular input.
 * TODO for other inputs the folding might have to change.
 */
function move2(position, direction, max) {
    for (let i = 0; i < max; i++) {
        let x = position[0] + direction[0];
        let y = position[1] + direction[1];
        let nextDir = direction;
        if (direction[1] < 0 && y < 0) {
            if (x >= 2 * edgeLength) {
                // B -> F
                [x, y] = [x - 2 * edgeLength, y + 4 * edgeLength];
            } else if (x > edgeLength) {
                // A -> F
                [x, y] = [-1 - y, x + 2 * edgeLength];
                nextDir = turnRight(direction);
            }
        } else if (direction[0] < 0 && x < 0) {
            if (y >= 3 * edgeLength) {
                // F -> A
                [x, y] = [y - 2 * edgeLength, -1 - x];
                nextDir = turnLeft(direction);
            } else if (y >= 2 * edgeLength) {
                // E -> A
                [x, y] = [edgeLength - 1 - x, 3 * edgeLength - 1 - y];
                nextDir = turn180(direction);
            }
        } else if (direction[0] > 0 && x >= 3 * edgeLength) {
            if (y < edgeLength) {
                // B -> D
                [x, y] = [5 * edgeLength - 1 - x, 3 * edgeLength - 1 - y];
                nextDir = turn180(direction);
            }
        } else if (direction[0] > 0 && x >= 2 * edgeLength) {
            if (y >= 2 * edgeLength) {
                // D -> B
                [x, y] = [5 * edgeLength - 1 - x, 3 * edgeLength - 1 - y];
                nextDir = turn180(direction);
            } else if (y >= edgeLength) {
                // C -> B
                [x, y] = [edgeLength + y, 3 * edgeLength - 1 - x];
                nextDir = turnLeft(direction);
            }
        } else if (direction[0] > 0 && x >= edgeLength) {
            if (y >= 3 * edgeLength) {
                // F -> D
                [x, y] = [y - 2 * edgeLength, 4 * edgeLength - 1 - x];
                nextDir = turnLeft(direction);
            }
        } else if (direction[1] > 0 && y >= 4 * edgeLength) {
            if (x < edgeLength) {
                // F -> B
                [x, y] = [x + 2 * edgeLength, y - 4 * edgeLength];
            }
        } else if (direction[1] > 0 && y >= 3 * edgeLength) {
            if (x >= edgeLength) {
                // D -> F
                [x, y] = [4 * edgeLength - 1 - y, x + 2 * edgeLength];
                nextDir = turnRight(direction);
            }
        } else if (direction[1] > 0 && y >= edgeLength) {
            if (x >= 2 * edgeLength) {
                // B -> C
                [x, y] = [3 * edgeLength - 1 - y, x - edgeLength];
                nextDir = turnRight(direction);
            }
        } else if (direction[0] < 0 && x < edgeLength) {
            if (y < edgeLength) {
                // A -> E
                [x, y] = [edgeLength - 1 - x, 3 * edgeLength - 1 - y];
                nextDir = turn180(direction);
            } else if (y < 2 * edgeLength) {
                // C -> E
                [x, y] = [y - edgeLength, 3 * edgeLength - 1 - x];
                nextDir = turnLeft(direction);
            }
        } else if (direction[1] < 0 && y < 2 * edgeLength) {
            if (x < edgeLength) {
                // E -> C
                [x, y] = [3 * edgeLength - 1 - y, x + edgeLength];
                nextDir = turnRight(direction);
            }
        }
        if (input[y] && input[y][x] === '.') {
            position[0] = x;
            position[1] = y;
            direction[0] = nextDir[0];
            direction[1] = nextDir[1];
        } else {
            break;
        }
    }
}

let {position: pos2, direction: dir2} = walkMap(move2);

log('solution #2:', dirPoints(pos2, dir2));
