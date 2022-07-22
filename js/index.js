/* global document */

import {FocusController} from './focus-controller.js'
import {TimeSelect} from './time-select.js'
import {TimeInput} from './time-input.js'
import {Storage} from './storage.js'
import {Settings} from './settings.js'

// TODO: Create Value class to manipulate

// TODO: Refactor storage usage
const appStorage = new Storage()

const SETTINGS_STORAGE_KEY_NAME = 'settings'
const settings = new Settings()
settings.setPredefined({
  arrival: {
    hours: 9
  },
  working: {
    hours: 8
  },
  lunch: {
    hours: 1
  },
  // TODO: Calculate leave on app loaded. Or mark computed value to filter on save
  leave: {
    hours: 18
  }
})

function loadSettings() {
  const savedSettings = appStorage.load(SETTINGS_STORAGE_KEY_NAME)

  if (savedSettings === null) {
    return
  }

  settings.setDefaults(savedSettings)
}

loadSettings()

document.querySelector('#settings-save-button').addEventListener('click', () => {
  // TODO: Refactor this
  [
    arrivalTimeInput,
    leaveTimeInput,
    workingTimeInput,
    lunchTimeInput
  ].forEach(input => {
    settings.setOption(input.getName(), input.getTimeInMilliseconds())
  })

  appStorage.save(SETTINGS_STORAGE_KEY_NAME, settings.getUserDefaults())
})

document.querySelector('#settings-reset-button').addEventListener('click', () => {
  settings.reset()
  appStorage.delete(SETTINGS_STORAGE_KEY_NAME)
})

function loadTimeInputValue(name) {
  let milliseconds = appStorage.load(name)

  if (milliseconds === null) {
    milliseconds = settings.getOption(name)
  }

  return {
    milliseconds
  }
}

const arrivalTimeInput = new TimeInput({
  name: 'arrival',
  element: document.querySelector('#arrival-input'),
  value: loadTimeInputValue('arrival')
})

const workingTimeInput = new TimeInput({
  name: 'working',
  element: document.querySelector('#working-input'),
  value: loadTimeInputValue('working')
})

const lunchTimeInput = new TimeInput({
  name: 'lunch',
  element: document.querySelector('#lunch-input'),
  value: loadTimeInputValue('lunch')
})

const leaveTimeInput = new TimeInput({
  name: 'leave',
  element: document.querySelector('#leave-input'),
  value: loadTimeInputValue('leave')
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
    input.addOnChangeListener((ms, name) => {
      this._updateLeave()
      appStorage.save(name, ms)
    })
  }

  _bindArrivalChanger(input) {
    input.addOnChangeListener((ms, name) => {
      this._updateArrival()
      appStorage.save(name, ms)
    })
  }

  _updateArrival() {
    const ms = this._calculateArrivalChangers()
    this._arrivalInput.setTimeInMilliseconds(ms)
    appStorage.save(this._arrivalInput.getName(), ms)
  }

  _updateLeave() {
    const ms = this._calculateLeaveChangers()
    this._leaveInput.setTimeInMilliseconds(ms)
    appStorage.save(this._leaveInput.getName(), ms)
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
c.initialize()
