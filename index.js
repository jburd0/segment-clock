const sleep = require('sleep');
const express = require('express');
const app = express();

const ShiftRegister = require('./modules/shiftRegister.js'); 
const Motor         = require('./modules/motor.js');
const Digit         = require('./modules/digit.js'); 

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

const motors = [ m0, m1, m2, m3, m4, m5, m6 ];

const s0 = new Digit(sr0, motors);


app.get('/char/:char', (req, res) => {
    let char = req.params['char'];
    s0.set(char);
    res.send(`Setting to: ${char}`);
});

app.get('/play', (req, res) => {
    for (let x = 0; x < 10; x++ ) {
        s0.set(x);
    }
    s0.set('off');
    res.send('hello world');
});

app.get('/alarm', (req, res) => {
    for (let x = 0; x < 10; x++ ) {
        if (x%2 === 0) {
            s0.set('off');
        } else {
            s0.set('on');
        }
    }
    s0.set('off');
    res.send('alarm');
});

function time() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    return m;
}
 
    /*
(setInterval(function() {
    let minute = time();
    if (minute < 10) {
        minute = '0' + time().toString();
        minute = minute[1];
    } else {
        minute = time().toString()[1];
    }
    console.log(minute);
    s0.set(minute);
}, 500));
*/

app.listen(3000);
