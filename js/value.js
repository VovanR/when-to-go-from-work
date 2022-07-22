class Value {
  constructor({
    hours = 0,
    minutes = 0,
    milliseconds = 0
  }) {
    this._milliseconds = normalizeCycledMilliseconds(secondsToMilliseconds(minutesToSeconds(hoursToMinutes(hours) + minutes)) + milliseconds)
  }

  toJSON() {
    return parseMillisecondsToTime(this._milliseconds)
  }

  toMilliseconds() {
    return this._milliseconds
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

export {Value}
