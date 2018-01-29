/* eslint no-unused-vars: 0 */

/**
 * Format Milliseconds To Time
 *
 * @example
 * formatMillisecondsToTime(33000000)
 * //=> '09:10'
 *
 * @param {Number} milliseconds
 * @returns {String} 'hh:mm'
 */
function formatMillisecondsToTime(seconds) {
  if (seconds === 0 || typeof seconds !== 'number') {
    return ''
  }

  const date = new Date(seconds)
  let h = date.getUTCHours()
  let m = date.getUTCMinutes()
  let time = ''

  if (h === 0) {
    h = '00'
  } else if (h < 10) {
    h = '0' + h
  }

  time += h + ':'

  if (m < 10) {
    m = '0' + m
  }

  time += m

  return time
}

/**
 * Parse Time to Milliseconds
 *
 * @example
 * parseTimeToMilliseconds('10:10')
 * //=> 36600000
 *
 * @param {String} time 'hh:mm'
 * @returns {Number}
 */
function parseTimeToMilliseconds(time) {
  const [hours, minutes] = time.split(':')

  const allMinutes = (parseInt(hours, 10) * 60) + parseInt(minutes, 10)
  const seconds = allMinutes * 60
  const milliseconds = seconds * 1000

  return milliseconds
}
