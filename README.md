# Redux Fundamentals Workshop
Accompanies the Building Redux workshop slide deck.

## Clone Repo
You will need to start by cloning this repo:

```bash
git clone https://github.com/andrew-codes/connect.tech-builing-redux-workshop.git
cd connect.tech-builindg-redux-workshop
```

## System Requirements
- [git](https://git-scm.com)
- [Node@^6.10.0](https://nodejs.org/en/)
- npm@^5.0.0 ([updating npm to ^5.0.0](./docs/Installing-Node-Requirements.md))

You can run `npm verify` to ensure you have the a valid version of node and npm installed.

```bash
npm run verify
```

## Updating an existing version of npm
npm i -g npm

## Setup

```bash
npm install
```

## Starting an Exercise
Exercises can be found in the `./exercises` directory and has an accompanying solution located in `./exercises-final`. Instructions for each exercise can be found in the exercise's `README.md` file; located in the root of the exercise directory. Exercises consist of a set of failing tests. These tests, combined with the slide deck, will guide you through the concepts and implementation.

## Running Exercise Tests
Run an exercise's test by executing the following command in your console: `npm test n` where `n` is the exercise number. So for example, running exercise 2, the command would be: `npm test 2`.

**GOTCHA**: Do not prefix the exercise number with a "0". This is done for each exercise directory solely for the purpose of listing them in numerical order within your OS/IDE.

## Running Solution Tests
Run an exercise's solution tests by appending `final` to the end of the CLI command. Example for running exercise 1's solution tests: `npm run test 1 final`.

# Other
- [LICENSE](./docs/LICENSE.md)
