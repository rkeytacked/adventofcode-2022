#!/usr/bin/env node
const {log, readSingletonMaps} = require("./common");

/* * * * * * * *
 * * DAY  09 * *
 * * * * * * * */

const input = readSingletonMaps('../inputs/09.txt', Number)

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function simulateTail(knots) {
    let touched = [];

    let pieces = [];
    for (let k = 0; k <= knots; k++) {
        pieces[k] = [0, 0];
    }

    for (let motion of input) {
        if (motion.R) {
            go([1, 0], motion.R);
        } else if (motion.L) {
            go([-1, 0], motion.L);
        } else if (motion.U) {
            go([0, -1], motion.U);
        } else if (motion.D) {
            go([0, 1], motion.D);
        }
    }

    function go(dir, len) {
        for (let i = len - 1; i >= 0; i--) {
            pieces[0][0] += dir[0];
            pieces[0][1] += dir[1];
            for (let k = 1; k <= knots; k++) {
                stepTail(k);
            }
            touched.push(pieces[knots].join(':'))
        }
    }

    function stepTail(k) {
        const head = pieces[k - 1];
        const tail = pieces[k];
        if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) {
            tail[0] += (head[0] > tail[0]) ? 1 : (head[0] < tail[0]) ? -1 : 0;
            tail[1] += (head[1] > tail[1]) ? 1 : (head[1] < tail[1]) ? -1 : 0;
        }
    }

    return touched;
}

log('solution #1:', new Set(simulateTail(1)).size);

log('-----------------------------------------------------------')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log("solution #2:", new Set(simulateTail(9)).size);
