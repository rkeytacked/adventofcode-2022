#!/usr/bin/env node
const {log, readLines, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  20 * *
 * * * * * * * */

const input = readLines('../inputs/20.txt', toNumber);

function connectLinkedList(list) {
    let zeroEntry;
    list.forEach((x, index) => {
        x.prev = list[(index + list.length - 1) % list.length];
        x.next = list[(index + 1) % list.length];
        if (x.nr === 0) {
            zeroEntry = x;
        }
    });
    return zeroEntry;
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findNeighbor(entry, distance) {
    let dir = distance < 0 ? 'prev' : 'next';
    let count = Math.abs(distance);
    let other = entry;
    for (let i = 0; i < count; i++) {
        other = other[dir];
    }
    return other;
}

function move(entry, distance) {
    let other = findNeighbor(entry, distance);
    if (distance < 0) {
        other = other.prev;
    }
    let after = other.next;
    if (other === entry || after === entry) return;

    entry.prev.next = entry.next;
    entry.next.prev = entry.prev;
    other.next = entry;
    entry.prev = other;
    after.prev = entry;
    entry.next = after;
}

function mix(list) {
    for (let entry of list) {
        move(entry, entry.nr % (list.length - 1));
    }
}

function sum3_1000(start) {
    let entry1000 = findNeighbor(start, 1000);
    let entry2000 = findNeighbor(entry1000, 1000);
    let entry3000 = findNeighbor(entry2000, 1000);
    return entry1000.nr + entry2000.nr + entry3000.nr;
}

let list = input.map(nr => ({nr}));
let zeroEntry = connectLinkedList(list);
mix(list);

log('solution #1:', sum3_1000(zeroEntry));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

list = input.map(nr => ({nr: nr * 811589153}));
zeroEntry = connectLinkedList(list);
for (let i = 0; i < 10; i++) {
    mix(list);
}

log('solution #2:', sum3_1000(zeroEntry));
