const colors = require('colors/safe');

const start = process.argv[2];
const end = process.argv[3];

const primeList = [];

function checkRange(start, end) {
    if (isNaN(start) || isNaN(end)) {
        console.log(colors.red('Error! Range not number!'))
    } else {
        printPrimeNumbers(+start, +end)
    }
}


function printPrimeNumbers(start, end) {
    next:
        for (let i = start; i <= end; i++) {
            for (let j = start; j < i; j++) {
                if (i % j === 0) continue next;
            }
            primeList.push(i);
        }
    printPrime(primeList)
}

function coloredLog(number, count) {
    switch (count) {
        case 1: {
            console.log(colors.green(number));
            break
        }
        case 2: {
            console.log(colors.yellow(number));
            break
        }
        case 3: {
            console.log(colors.red(number));
            break
        }
    }
}

function printPrime(list) {
    if (list.length > 0) {
        for (let i = 0; i < list.length && i < 3; i++) {
            coloredLog(list[i], i + 1)
        }
    } else {
        console.log(colors.red('Prime numbers nof found!'))
    }
}

checkRange(start, end);