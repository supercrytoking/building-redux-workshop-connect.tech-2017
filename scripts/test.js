#!/usr/bin/env node

const argv = require('yargs').argv;
const cp = require('child_process');

const spawn = cp.spawn;
const exerciseNumber = argv._[0];
const isFinal = argv._[1] === 'final';

spawn('jest', [
    `"exercises${isFinal ? '-final' : ''}/exercise-.*${exerciseNumber ? exerciseNumber : ''}"`,
], {
    shell: true,
    stdio: 'inherit',
});
