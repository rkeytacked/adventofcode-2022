#!/usr/bin/env node
const {log, readLines, split, toNumber, prod} = require("./common");

/* * * * * * * *
 * * DAY  19 * *
 * * * * * * * */

const input = readLines('../inputs/19.txt', split(/\s*[.:]\s*/g));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findBestGeodes(robotCosts, time) {

    let best = -1;
    let bestPath;

    function findRecursively(ore, oreRobots, clay, clayRobots, obsidian, obsidianRobots, geode, geodeRobots, timeLeft, path) {
        if (geode + timeLeft * geodeRobots > best) {
            best = geode + timeLeft * geodeRobots;
            bestPath = path;
        }

        if (obsidianRobots) {
            let timeToGeodeRobot = Math.max(0, Math.ceil((robotCosts.geode.ore - ore) / oreRobots), Math.ceil((robotCosts.geode.obsidian - obsidian) / obsidianRobots)) + 1;
            if (timeToGeodeRobot < timeLeft) {
                findRecursively(
                    ore + timeToGeodeRobot * oreRobots - robotCosts.geode.ore, oreRobots,
                    clay + timeToGeodeRobot * clayRobots, clayRobots,
                    obsidian + timeToGeodeRobot * obsidianRobots - robotCosts.geode.obsidian, obsidianRobots,
                    geode + timeToGeodeRobot * geodeRobots, geodeRobots + 1,
                    timeLeft - timeToGeodeRobot,
                    [...path, 'geode']
                );
            }
        }
        if (clayRobots) {
            let timeToObsidianRobot = Math.max(0, Math.ceil((robotCosts.obsidian.ore - ore) / oreRobots), Math.ceil((robotCosts.obsidian.clay - clay) / clayRobots)) + 1;
            if (timeToObsidianRobot < timeLeft) {
                findRecursively(
                    ore + timeToObsidianRobot * oreRobots - robotCosts.obsidian.ore, oreRobots,
                    clay + timeToObsidianRobot * clayRobots - robotCosts.obsidian.clay, clayRobots,
                    obsidian + timeToObsidianRobot * obsidianRobots, obsidianRobots + 1,
                    geode + timeToObsidianRobot * geodeRobots, geodeRobots,
                    timeLeft - timeToObsidianRobot,
                    [...path, 'obsidian']
                );
            }
        }
        if (clayRobots < 10) { // TODO magic number found from looking at best paths for smaller time
            let timeToClayRobot = Math.max(0, Math.ceil((robotCosts.clay.ore - ore) / oreRobots)) + 1;
            if (timeToClayRobot < timeLeft) {
                findRecursively(
                    ore + timeToClayRobot * oreRobots - robotCosts.clay.ore, oreRobots,
                    clay + timeToClayRobot * clayRobots, clayRobots + 1,
                    obsidian + timeToClayRobot * obsidianRobots, obsidianRobots,
                    geode + timeToClayRobot * geodeRobots, geodeRobots,
                    timeLeft - timeToClayRobot,
                    [...path, 'clay']
                );
            }
        }
        if (oreRobots < 4) { // TODO magic number found from looking at best paths for smaller time
            let timeToOreRobot = Math.max(0, Math.ceil((robotCosts.ore.ore - ore) / oreRobots)) + 1;
            if (timeToOreRobot < timeLeft) {
                findRecursively(
                    ore + timeToOreRobot * oreRobots - robotCosts.ore.ore, oreRobots + 1,
                    clay + timeToOreRobot * clayRobots, clayRobots,
                    obsidian + timeToOreRobot * obsidianRobots, obsidianRobots,
                    geode + timeToOreRobot * geodeRobots, geodeRobots,
                    timeLeft - timeToOreRobot,
                    [...path, 'ore']
                );
            }
        }
    }

    findRecursively(0, 1, 0, 0, 0, 0, 0, 0, time, []);
    return best;
}


let sumLevels = 0;
for (let blueprint of input) {
    let [[id], [ore2Ore], [ore2Clay], [ore2Obsidian, clay2Obsidian], [ore2geode, obsidian2geode]] =
        blueprint.map(line => line && line.match(/\d+/g).map(toNumber));
    let result = findBestGeodes({
        ore: {ore: ore2Ore},
        clay: {ore: ore2Clay},
        obsidian: {ore: ore2Obsidian, clay: clay2Obsidian},
        geode: {ore: ore2geode, obsidian: obsidian2geode},
    }, 24);
    sumLevels += id * result;
}

log('solution #1:', sumLevels);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let firstThree = input.slice(0, 3).map(blueprint => {
    let [, [ore2Ore], [ore2Clay], [ore2Obsidian, clay2Obsidian], [ore2geode, obsidian2geode]] =
        blueprint.map(line => line && line.match(/\d+/g).map(toNumber));
    return findBestGeodes({
        ore: {ore: ore2Ore},
        clay: {ore: ore2Clay},
        obsidian: {ore: ore2Obsidian, clay: clay2Obsidian},
        geode: {ore: ore2geode, obsidian: obsidian2geode},
    }, 32);
});

log('solution #2:', prod(firstThree));
