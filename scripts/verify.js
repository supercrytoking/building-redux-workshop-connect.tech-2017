#!/usr/bin/env node

const execSync = require('child_process').execSync;
const pkg = require('./../package.json');

const node = process.version;
var npm;
try {
    npm = execSync('npm --version')
        .toString()
        .trim();
}
catch (error) {
}

const errors = checkVersion(node, npm);

const errorCount = errors.length;
if (errorCount === 0) {
    console.log('👍  Your version of nodejs and npm are good. You are ready to rock n\' roll!');
    process.exit(0);
}

const errorMessage = errors
    .map(error => `🌭  ${error}`)
    .join('\n\n');
const hasSingleError = errorCount === 1;
console.error(`🌭  There ${hasSingleError ? 'is an issue' : 'are some issues'} with your system. It is quite likely that if you do not resolve these, you will have a hard time running this repository.

${errorMessage}`);
console.info('\nIf you don\'t care about these warnings, go ahead and install dependencies with `npm install`');
process.exit(1);

// --
// returns actualVersion >= desiredVersion
function versionIsGreaterOrEqual(desiredVersion, actualVersion) {
    const versionExpression = /\^?(\d+)\.(\d+)\.(\d+)/;
    const desiredVersionParts = versionExpression.exec(desiredVersion);
    const desiredMajor = Number(desiredVersionParts[1]);
    const desiredMinor = Number(desiredVersionParts[2]);
    const desiredPatch = Number(desiredVersionParts[3]);
    const actualVersions = versionExpression.exec(actualVersion);
    const actualMajor = Number(actualVersions[1]);
    const actualMinor = Number(actualVersions[2]);
    const actualPatch = Number(actualVersions[3]);
    if (actualMajor < desiredMajor) {
        return false;
    }
    else if (actualMajor > desiredMajor) {
        return true;
    }
    if (actualMinor < desiredMinor) {
        return false;
    }
    else if (actualMinor > desiredMinor) {
        return true;
    }
    if (actualPatch < desiredPatch) {
        return false;
    }
    else if (actualPatch > desiredPatch) {
        return true;
    }
    return true;
}

function checkVersion(nodeVersion, npmVersion) {
    const desiredVersions = {
        node: pkg.engines.node,
        npm: pkg.engines.npm,
    };

    const errors = {
        oldNode: {
            getMessage: (desired, actual) => `Your version of node (${actual}) is older than the recommended version of ${desired}. Please install a more recent version. You can use http://git.io/nvm or https://github.com/coreybutler/nvm-windows to make upgrading your version of node easier.`,
            isProblem: false,
        },
        oldNpm: {
            getMessage: (desired, actual) => `Your version of npm (${actual}) is older than the recommended version of ${desired}. Please install a more recenter version. You can install the latest version by running \`npm install --global npm@latest\`.`,
            isProblem: false,
        },
    };

    errors.oldNode.isProblem = !versionIsGreaterOrEqual(desiredVersions.node, nodeVersion);
    errors.oldNode.message = errors.oldNode.getMessage(desiredVersions.node, nodeVersion);
    errors.oldNpm.isProblem = !versionIsGreaterOrEqual(desiredVersions.npm, npmVersion);
    errors.oldNpm.message = errors.oldNpm.getMessage(desiredVersions.npm, npmVersion);

    return Object.keys(errors)
        .filter(key => errors[key].isProblem)
        .map(key => errors[key].message);
}
