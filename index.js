const sleep = require('sleep');

const Motor         = require('./modules/motor.js');
const ShiftRegister = require('./modules/shiftRegister.js'); 
const Segment       = require('./modules/segment.js'); 

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

const s0 = new Segment(sr0, motors);

s0.set(2);
s0.set('off');
