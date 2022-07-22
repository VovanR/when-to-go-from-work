import {Value} from './value.js'

class TimeInput {
  constructor({
    name,
    element,
    value: {
      hours = 0,
      minutes = 0,
      milliseconds = 0
    } = {}
  }) {
    this._name = name
    this._milliseconds = milliseconds
    this._hours = hours
    this._minutes = minutes
    this._element = element

    this._activeClassName = 'time-input__input_focus'

    this._onChangeListeners = new Set()
    this._onFocusListeners = new Set()

    this._bindControls()

    // TODO: Refactor this
    if (this._milliseconds) {
      this.setTimeInMilliseconds(this._milliseconds)
    } else {
      this._update()
    }
  }

  getName() {
    return this._name
  }

  addOnChangeListener(callback) {
    this._onChangeListeners.add(callback)
  }

  addOnFocusListener(callback) {
    this._onFocusListeners.add(callback)
  }

  _bindControls() {
    this._element.addEventListener('click', () => {
      this._onFocusListeners.forEach(callback => callback(this))
    })
  }

  _onChange() {
    // TODO: Refactor callback arguments
    this._onChangeListeners.forEach(callback => callback(this.getTimeInMilliseconds(), this._name))
  }

  _getFormattedValue() {
    return `${this._hours}:${this._minutes > 9 ? this._minutes : `0${this._minutes}`}`
  }

  _isValid(value, name) {
    if (typeof value === 'number') {
      return true
    }

    throw new TypeError(`${name} value must be Number`)
  }

  setHours(hours) {
    this._isValid(hours, 'hours')

    this._hours = hours

    this._onChange()
    this._update()
  }

  getHours() {
    return this._hours
  }

  setMinutes(minutes) {
    this._isValid(minutes, 'minutes')

    this._minutes = minutes

    this._onChange()
    this._update()
  }

  getMinutes() {
    return this._minutes
  }

  getTimeInMilliseconds() {
    return new Value({
      hours: this._hours,
      minutes: this._minutes
    }).toMilliseconds()
  }

  setTimeInMilliseconds(milliseconds) {
    this._isValid(milliseconds, 'milliseconds')

    const {
      minutes,
      hours
    } = new Value({milliseconds}).toJSON()

    this._minutes = minutes
    this._hours = hours

    // TODO: this._onChange()
    this._update()
  }

  _update() {
    this._element.textContent = this._getFormattedValue()
  }

  setFocusedStyle() {
    this._element.classList.add(this._activeClassName)
  }

  removeFocusedStyle() {
    this._element.classList.remove(this._activeClassName)
  }
}

export {TimeInput}
