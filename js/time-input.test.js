import test from 'ava'
import {TimeInput} from './time-input'

test('setTimeInMilliseconds', t => {
  const element = {
    textContent: '',
    addEventListener: () => {}
  }
  const timeInput = new TimeInput({element})

  timeInput.setTimeInMilliseconds(0)
  t.is(element.textContent, '0:00')

  timeInput.setTimeInMilliseconds(60000)
  t.is(element.textContent, '0:01')

  timeInput.setTimeInMilliseconds(300000)
  t.is(element.textContent, '0:05')

  timeInput.setTimeInMilliseconds(540000)
  t.is(element.textContent, '0:09')

  timeInput.setTimeInMilliseconds(600000)
  t.is(element.textContent, '0:10')

  timeInput.setTimeInMilliseconds(3540000)
  t.is(element.textContent, '0:59')

  timeInput.setTimeInMilliseconds(3660000)
  t.is(element.textContent, '1:01')

  timeInput.setTimeInMilliseconds(47700000)
  t.is(element.textContent, '13:15')

  timeInput.setTimeInMilliseconds(64800000)
  t.is(element.textContent, '18:00')

  timeInput.setTimeInMilliseconds(64800000)
  t.is(element.textContent, '18:00')

  timeInput.setTimeInMilliseconds(-3600000)
  t.is(element.textContent, '23:00')

  timeInput.setTimeInMilliseconds(-144300000)
  t.is(element.textContent, '7:55')

  timeInput.setTimeInMilliseconds(43200000 + 43200000 + 43200000)
  t.is(element.textContent, '12:00')
})
