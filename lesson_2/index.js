const EventEmitter = require('events');

const [hour, day, month, year] = process.argv[2].split('-');

const timerDate = new Date(+year, month - 1, +day, +hour);

const createTimer=()=>{
    timerEmitter.emit('start')
}

const timer = () => {
    setInterval(function () {
        let now = new Date();
        let ms_left = timerDate - now;
        if (ms_left < 0) {
            clearInterval(timer);
            console.log("Invalid time interval");
        }else if(ms_left===0){
            clearInterval(timer);
            console.log("Time`s up!");
        }
        else {
            let res = new Date(ms_left);
            let str_timer = `${res.getUTCFullYear() - 1970} years ${res.getUTCMonth()} months ${res.getUTCDate() - 1} days ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}`;
            console.log(str_timer)
        }
    }, 1000)
};

class Handler {
    static start() {
        console.log('Start timer');
        timer();
    }
}
class MyEmitter extends EventEmitter {}

const timerEmitter = new MyEmitter();
timerEmitter.on('start', Handler.start)

createTimer()