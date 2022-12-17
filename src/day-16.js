#!/usr/bin/env node
const {log, readLines, sum, split} = require("./common");

/* * * * * * * *
 * * DAY  16 * *
 * * * * * * * */

const input = readLines('../inputs/16.txt', split(/\s*(?:Valve|has flow rate=|; tunnels? leads? to valves?)\s*/g));

let graph = {};
for (let [, name, rate, valves] of input) {
    graph[name] = {
        rate: Number(rate),
        paths: valves.split(/,\s*/g)
    }
}

function findValves(start) {
    let result = {};
    let visited = new Set([start]);
    let stack = [{valve: start, length: 0}];
    while (stack.length) {
        const {valve, length} = stack.shift();
        if (valve !== start && graph[valve].rate) {
            result[valve] = length;
        }
        for (let target of graph[valve].paths) {
            if (!visited.has(target)) {
                visited.add(target);
                stack.push({valve: target, length: length + 1});
            }
        }
    }
    return result;
}

for (let valve in graph) {
    graph[valve].valves = findValves(valve);
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findNextValvesToOpen(position, timeLeft, openedValves) {
    let candidates = graph[position].valves;
    return Object.keys(candidates).map(valve => ({
        valve,
        stepsToOpen: candidates[valve] + 1,
        value: (timeLeft - (candidates[valve] + 1)) * graph[valve].rate
    })).filter(a => !openedValves.has(a.valve) && a.value > 0)
        .sort((a, b) => a.value - b.value);
}

function findBestPath(start, time) {
    let opened = new Set();
    let potential = sum(Object.values(graph).map(x => x.rate));
    let best = 0;

    function findBestRecursive(position, timeLeft, pointsAchieved) {
        let bestPoints = pointsAchieved;
        best = Math.max(best, bestPoints);
        if (bestPoints + potential * (timeLeft - 2) < best) {
            return bestPoints;
        }
        let options = findNextValvesToOpen(position, timeLeft, opened);
        while (options.length) {
            let {valve, value, stepsToOpen} = options.pop();
            opened.add(valve);
            potential -= graph[valve].rate;
            let result = findBestRecursive(valve, timeLeft - stepsToOpen, pointsAchieved + value);
            if (result > bestPoints) {
                bestPoints = result;
                best = Math.max(best, bestPoints);
            }
            opened.delete(valve);
            potential += graph[valve].rate;
        }
        return bestPoints;
    }

    return findBestRecursive(start, time, 0);

}

log('solution #1', findBestPath('AA', 30));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */


function findBestPathDuo(start, time) {
    let opened = new Set();
    let potential = sum(Object.values(graph).map(x => x.rate));
    let best = 0;

    function findBestRecursive(position1, stepsLeft1, position2, stepsLeft2, timeLeft, pointsAchieved) {
        let bestPoints = pointsAchieved;
        best = Math.max(best, bestPoints);
        if (bestPoints + potential * (timeLeft - 2) < best) {
            return bestPoints;
        }
        if (!stepsLeft1) {
            let options = findNextValvesToOpen(position1, timeLeft, opened);
            while (options.length) {
                let {valve, value, stepsToOpen} = options.pop();
                opened.add(valve);
                potential -= graph[valve].rate;
                let result;
                if (stepsToOpen <= stepsLeft2) {
                    result = findBestRecursive(valve, 0, position2, stepsLeft2 - stepsToOpen, timeLeft - stepsToOpen, pointsAchieved + value);
                } else {
                    result = findBestRecursive(valve, stepsToOpen - stepsLeft2, position2, 0, timeLeft - stepsLeft2, pointsAchieved + value);
                }
                if (result > bestPoints) {
                    bestPoints = result;
                    best = Math.max(best, bestPoints);
                }
                opened.delete(valve);
                potential += graph[valve].rate;
            }
        }
        if (!stepsLeft2) {
            let options = findNextValvesToOpen(position2, timeLeft, opened);
            while (options.length) {
                let {valve, value, stepsToOpen} = options.pop();
                opened.add(valve);
                potential -= graph[valve].rate;
                let result;
                if (stepsToOpen <= stepsLeft1) {
                    result = findBestRecursive(position1, stepsLeft1 - stepsToOpen, valve, 0, timeLeft - stepsToOpen, pointsAchieved + value);
                } else {
                    result = findBestRecursive(position1, 0, valve, stepsToOpen - stepsLeft1, timeLeft - stepsLeft1, pointsAchieved + value);
                }
                if (result > bestPoints) {
                    bestPoints = result;
                    best = Math.max(best, bestPoints);
                }
                opened.delete(valve);
                potential += graph[valve].rate;
            }
        }
        return bestPoints;
    }

    return findBestRecursive(start, 0, start, 0, time, 0);

}

log('solution #2', findBestPathDuo('AA', 26));