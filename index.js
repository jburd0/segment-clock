const sleep = require('sleep');
const Gpio = require('onoff').Gpio;
const Motor = require('./modules/motor.js');

const DATA  = new Gpio(17, 'out');
const CLK   = new Gpio(27, 'out');
const LATCH = new Gpio(22, 'out');

const m0 = new Motor(0);
const m1 = new Motor(1);
const m2 = new Motor(2);
const m3 = new Motor(3);
const m4 = new Motor(4);
const m5 = new Motor(5);
const m6 = new Motor(6);

const one = [1, 2];

const motors = [ m0, m1, m2, m3, m4, m5, m6 ];

/*
 * 
 *
 */
function getOnOff(motors, number) {
    let on  = 0;
    let off = 0;

    motors.forEach( motor => {
        if (number.includes(motor._motor) && !motor._state) {
            on  = on + motor._dir + motor._step;
            off = off + motor._dir;
            motor._state = true;
        } else if (motor._state) {
            off = off + motor._step;
            motor._state = false;
        }
    })

    return { on: on, off: off };
}

function shiftOut(byte) {
    //let speed = 1;
    let data = 0;
    let array = [];
    for (let x = 7; x >= 0; x--) {
        data = (byte >> x) & 1;

        DATA.writeSync(data);
        CLK.writeSync(1);
        DATA.writeSync(0);
        CLK.writeSync(0);

        process.stdout.write(data.toString());
    }
    console.log('');
}

function rotate(on, off) {
    for (let i = 0; i < 1024; i++) {
        shiftOut(on);
        latch();
        shiftOut(off);
        latch();
        sleep.usleep(1000);
    }
}

function latch() {
    LATCH.writeSync(1);
    LATCH.writeSync(0);
}


let nums = getOnOff(motors, one);
rotate(nums.on, nums.off);
