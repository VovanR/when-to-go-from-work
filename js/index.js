/* global document */

const arrivalInput = document.getElementById('arrival')
const workingInput = document.getElementById('working')
const lunchInput = document.getElementById('lunch')
const leaveInput = document.getElementById('leave')

class A {
  constructor(options) {
    this._arrivalInput = options.arrivalInput
    this._leaveInput = options.leaveInput

    this._changers = []

    this._initialize()
  }

  _initialize() {
    this._bindLeaveChanger(this._arrivalInput)
    this._bindArrivalChanger(this._leaveInput)
  }

  _bindLeaveChanger(input) {
    input.addEventListener('input', () => this._updateLeave())
  }

  _bindArrivalChanger(input) {
    input.addEventListener('input', () => this._updateArrival())
  }

  _updateArrival() {
    this._arrivalInput.valueAsNumber = this._calculateArrivalChangers()
  }

  _updateLeave() {
    this._leaveInput.valueAsNumber = this._calculateLeaveChangers()
  }

  _defaultCalculate(input, reducer) {
    return this._changers.reduce(reducer, input.valueAsNumber)
  }

  _calculateArrivalChangers() {
    return this._defaultCalculate(this._leaveInput, this._arrivalReducer.bind(this))
  }

  _calculateLeaveChangers() {
    return this._defaultCalculate(this._arrivalInput, this._laveReducer.bind(this))
  }

  _defaultReducer(acc, input, reducer) {
    return reducer(acc, input.valueAsNumber)
  }

  _arrivalReducer(acc, input) {
    return this._defaultReducer(acc, input, (acc, cur) => acc - cur)
  }

  _laveReducer(acc, input) {
    return this._defaultReducer(acc, input, (acc, cur) => acc + cur)
  }

  addLeaveChanger(input) {
    this._bindLeaveChanger(input)
    this._changers.push(input)
  }

  addArrivalChanger(input) {
    this._bindArrivalChanger(input)
    this._changers.push(input)
  }
}

const a = new A({arrivalInput, leaveInput})
a.addLeaveChanger(workingInput)
a.addLeaveChanger(lunchInput)
