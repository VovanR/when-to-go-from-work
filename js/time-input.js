class TimeInput {
  constructor({
    element,
    value: {
      hours = 0,
      minutes = 0
    } = {}
  }) {
    this._milliseconds = 0
    this._hours = hours
    this._minutes = minutes
    this._element = element

    this._activeClassName = 'time-input__input_focus'

    this._onChangeListeners = new Set()
    this._onFocusListeners = new Set()

    this._bindControls()

    this._update()
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
    this._onChangeListeners.forEach(callback => callback(this.getTimeInMilliseconds()))
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
    return secondsToMilliseconds(minutesToSeconds(hoursToMinutes(this._hours) + this._minutes))
  }

  setTimeInMilliseconds(milliseconds) {
    this._isValid(milliseconds, 'milliseconds')

    const {
      minutes,
      hours
    } = parseMillisecondsToTime(normalizeCycledMilliseconds(milliseconds))

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

const MILLISECONDS_IN_ONE_SECOND = 1000
const SECONDS_IN_ONE_MINUTE = 60
const MINUTES_IN_ONE_HOUR = 60
const HOURS_IN_ONE_DAY = 24

const hoursToMinutes = hours => hours * MINUTES_IN_ONE_HOUR
const minutesToSeconds = minutes => minutes * SECONDS_IN_ONE_MINUTE
const secondsToMilliseconds = seconds => seconds * MILLISECONDS_IN_ONE_SECOND

const millisecondsToSeconds = milliseconds => milliseconds / MILLISECONDS_IN_ONE_SECOND
const secondsToMinutes = seconds => seconds / SECONDS_IN_ONE_MINUTE
const minutesToHours = minutes => minutes / MINUTES_IN_ONE_HOUR

const MILLISECONDS_IN_ONE_DAY = secondsToMilliseconds(minutesToSeconds(hoursToMinutes(HOURS_IN_ONE_DAY)))

const normalizeCycledMilliseconds = milliseconds => {
  if (milliseconds >= 0) {
    if (milliseconds < MILLISECONDS_IN_ONE_DAY) {
      return milliseconds
    }

    return milliseconds % MILLISECONDS_IN_ONE_DAY
  }

  if (milliseconds > -(MILLISECONDS_IN_ONE_DAY)) {
    return MILLISECONDS_IN_ONE_DAY + milliseconds
  }

  return MILLISECONDS_IN_ONE_DAY + (milliseconds % MILLISECONDS_IN_ONE_DAY)
}

const parseMillisecondsToTime = milliseconds => {
  const timeInMinutes = secondsToMinutes(millisecondsToSeconds(milliseconds))

  const minutes = timeInMinutes % MINUTES_IN_ONE_HOUR
  const hours = minutesToHours(timeInMinutes - minutes)

  return {
    minutes,
    hours
  }
}

export {TimeInput}
