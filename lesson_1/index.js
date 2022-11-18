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
    if(start===1){
        start=2;
    }
    next:
        for (let i = start; i <= end; i++) {
            for (let j = 2; j < i; j++) {
                if (i % j === 0) continue next;
            }
            primeList.push(i);
        }
    printPrime(primeList)
}

function printPrime(list) {
    if (list.length > 0) {
        for (let i = 0; i < list.length; i = i + 3) {
            console.log(colors.green(list[i]));
            if(list[i+1])console.log(colors.yellow(list[i + 1]));
            if(list[i+2])console.log(colors.red(list[i + 2]));
        }
    } else {
        console.log(colors.red('Prime numbers nof found!'))
    }
}

checkRange(start, end);