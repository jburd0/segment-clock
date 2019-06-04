class Motor {
    constructor(num, steps=2048) {
        this._motor = num;
        this._step  = Math.pow(2, 2*num);
        this._dir   = Math.pow(2, 2*num+1);
        this._state = false;
        this._steps = steps;
    }
}

module.exports = Motor;
