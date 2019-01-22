/* global document */

import {FocusController} from './focus-controller.js'
import {TimeSelect} from './time-select.js'
import {TimeInput} from './time-input.js'

const arrivalTimeInput = new TimeInput({
  element: document.querySelector('#arrival-input'),
  value: {
    hours: 9
  }
})

const workingTimeInput = new TimeInput({
  element: document.querySelector('#working-input'),
  value: {
    hours: 8
  }
})

const lunchTimeInput = new TimeInput({
  element: document.querySelector('#lunch-input'),
  value: {
    hours: 1
  }
})

const leaveTimeInput = new TimeInput({
  element: document.querySelector('#leave-input'),
  value: {
    hours: 18
  }
})

class A {
  constructor({
    arrivalTimeInput,
    leaveTimeInput
  }) {
    this._arrivalInput = arrivalTimeInput
    this._leaveInput = leaveTimeInput

    this._changers = []

    this._initialize()
  }

  _initialize() {
    this._bindLeaveChanger(this._arrivalInput)
    this._bindArrivalChanger(this._leaveInput)
  }

  _bindLeaveChanger(input) {
    input.addOnChangeListener(() => this._updateLeave())
  }

  _bindArrivalChanger(input) {
    input.addOnChangeListener(() => this._updateArrival())
  }

  _updateArrival() {
    this._arrivalInput.setTimeInMilliseconds(this._calculateArrivalChangers())
  }

  _updateLeave() {
    this._leaveInput.setTimeInMilliseconds(this._calculateLeaveChangers())
  }

  _defaultCalculate(input, reducer) {
    return this._changers.reduce(reducer, input.getTimeInMilliseconds())
  }

  _calculateArrivalChangers() {
    return this._defaultCalculate(this._leaveInput, this._arrivalReducer.bind(this))
  }

  _calculateLeaveChangers() {
    return this._defaultCalculate(this._arrivalInput, this._laveReducer.bind(this))
  }

  _defaultReducer(acc, input, reducer) {
    return reducer(acc, input.getTimeInMilliseconds())
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

const a = new A({
  arrivalTimeInput,
  leaveTimeInput
})
a.addLeaveChanger(workingTimeInput)
a.addLeaveChanger(lunchTimeInput)

const focusController = new FocusController({
  focusedInput: arrivalTimeInput,
  inputs: [
    arrivalTimeInput,
    workingTimeInput,
    lunchTimeInput,
    leaveTimeInput
  ]
})

const c = new TimeSelect({
  element: document.querySelector('#time-select'),
  onChange: ({type, value}) => {
    const activeInput = focusController.getActiveElement()

    switch (type) {
      case 'hours':
        activeInput.setHours(value)
        break
      case 'minutes':
        activeInput.setMinutes(value)
        break
      default:
        throw new Error('Unhandled type change')
    }
  }
})
