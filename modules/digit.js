const sleep = require('sleep');

class Digit {

    _chars = {
        '0': [0, 1, 2, 3, 4, 5],
        '1': [1, 2],
        '2': [0, 1, 3, 4, 6],
        '3': [0, 1, 2, 3, 6],
        '4': [1, 2, 5, 6],
        '5': [0, 2, 3, 5, 6],
        '6': [0, 2, 3, 4, 5, 6],
        '7': [0, 1, 2],
        '8': [0, 1, 2, 3, 4, 5, 6],
        '9': [0, 1, 2, 3, 5, 6],

        'A': [0, 1, 2, 4, 5, 6],
        'b': [2, 3, 4, 5, 6],
        'C': [0, 3, 4, 5],
        'C': [3, 4, 6],
        'd': [1, 2, 3, 4, 6],
        'E': [0, 3, 4, 5, 6],
        'F': [0, 4, 5, 6],

        'off': [],
        'on':  [0, 1, 2, 3, 4, 5, 6]
    };

    constructor(shiftRegister, motors, value=null) {
        this._sr     = shiftRegister;
        this._motors = motors;
        this._value  = value;
    }

    getOnOff(char) {
        let on  = 0;
        let off = 0;

        this._motors.forEach( motor => {
            if (char.includes(motor._motor) && !motor._state) {
                // console.log(motor);
                on  = on + motor._dir + motor._step;
                off = off + motor._dir;
                motor._state = true;
            } else if (!char.includes(motor._motor) && motor._state) {
                // console.log(motor);
                off = off + motor._step;
                motor._state = false;
            }
        })
        this._on  = on;
        this._off = off;

        return { on: on, off: off };
    }

    rotate() {
        for (let i = 0; i < 515; i++) {
            this._sr.shiftOut(this._on);
            this._sr.latch();
            this._sr.shiftOut(this._off);
            this._sr.latch();
            sleep.usleep(1200);
        }
        console.log(this._on);
        console.log(this._off);
    }

    set(char) {
        this.getOnOff(this._chars[char]);
        this.rotate();
        this._value = char;
    }

}

module.exports = Digit;
