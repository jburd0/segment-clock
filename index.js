const sleep = require('sleep');
const Gpio = require('onoff').Gpio;
const Motor = require('./modules/motor.js');
const ShiftRegister = require('./modules/shiftRegister.js'); 

const data  = 17;
const clock = 27;
const latch = 22;

const sr0 = new ShiftRegister(data, clock, latch);

const m0 = new Motor(0);
const m1 = new Motor(1);
const m2 = new Motor(2);
const m3 = new Motor(3);
const m4 = new Motor(4);
const m5 = new Motor(5);
const m6 = new Motor(6);

const zero  = [0, 1, 2, 3, 4, 5];
const one   = [1, 2];
const two   = [0, 1, 3, 4, 6];
const three = [0, 1, 2, 3, 6];
const four  = [1, 2, 3, 5, 6];
const five  = [0, 2, 3, 6, 6];
const six   = [0, 2, 3, 4, 5, 6];
const seven = [0, 1, 2];
const eight = [0, 1, 2, 3, 4, 5, 6];
const nine  = [0, 1, 2, 5, 6];

const testOn  = eight;
const testOff  = [];

const motors = [ m0, m1, m2, m3, m4, m5, m6 ];

function getOnOff(motors, number) {
    let on  = 0;
    let off = 0;

    motors.forEach( motor => {
        if (number.includes(motor._motor) && !motor._state) {
            // console.log(motor);
            on  = on + motor._dir + motor._step;
            off = off + motor._dir;
            motor._state = true;
        } else if (!number.includes(motor._motor) && motor._state) {
            // console.log(motor);
            off = off + motor._step;
            motor._state = false;
        }
    })

    return { on: on, off: off };
}

function rotate(on, off) {
    for (let i = 0; i < 515; i++) {
        sr0.shiftOut(on);
        sr0.latch();
        sr0.shiftOut(off);
        sr0.latch();
        sleep.usleep(1200);
    }
    console.log(on);
    console.log(off);
}

let nums = getOnOff(motors, testOn);
rotate(nums.on, nums.off);

sleep.sleep(1);
nums = getOnOff(motors, testOff);
rotate(nums.on, nums.off);
