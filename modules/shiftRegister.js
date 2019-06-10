const Gpio = require('onoff').Gpio;

class ShiftRegister {
    constructor(data, clock, latch) {
        this._data  = new Gpio(data, 'out');
        this._clock = new Gpio(clock, 'out');
        this._latch = new Gpio(latch, 'out');
    }

    latch() {
        this._latch.writeSync(1);
        this._latch.writeSync(0);
    }

    shiftOut(byte) {
        let bit = 0;
        let array = [];

        for (let x = 7; x >= 0; x--) {
            bit = (byte >> x) & 1;

            this._data.writeSync(bit);
            this._clock.writeSync(1);
            this._data.writeSync(0);
            this._clock.writeSync(0);
            // process.stdout.write(bit.toString());
        }
        // console.log();
    }
}

module.exports = ShiftRegister;
