/* global fixture test */

import {Selector} from 'testcafe'

/* eslint-disable new-cap */
const arrivalInput = Selector('#arrival-input')
const workingInput = Selector('#working-input')
const lunchInput = Selector('#lunch-input')
const leaveInput = Selector('#leave-input')

const hoursSelector = Selector('.time-select__hours')
const minutesSelector = Selector('.time-select__minutes')
/* eslint-enable new-cap */

const getHourSelectButton = value => hoursSelector.find('.time-select__button').withText(String(value))
const getMinutesSelectButton = value => minutesSelector.find('.time-select__button').withText(String(value))

const getHoursFirstToggleControl = () => hoursSelector.find('.time-select__toggle-controls').nth(0)
const getHoursLastToggleControl = () => hoursSelector.find('.time-select__toggle-controls').nth(1)

// eslint-disable-next-line no-unused-expressions
fixture`Getting Started`
  .page`http://localhost:8080`

/*
  Functional-Style Selectors https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors/functional-style-selectors.html
  Assertion API https://devexpress.github.io/testcafe/documentation/test-api/assertions/assertion-api.html
  DOM Node State https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/dom-node-state.html
 */

test('Default values', async t => {
  await t
    .expect(arrivalInput.textContent).eql('9:00')
    .expect(workingInput.textContent).eql('8:00')
    .expect(lunchInput.textContent).eql('1:00')
    .expect(leaveInput.textContent).eql('18:00')
})

test('Arrival focused on app loaded', async t => {
  await t
    .expect(arrivalInput.hasClass('time-input__input_focus')).ok()
})

test('Change arrival', async t => {
  await t
    .click(getHourSelectButton(8))
    .click(getMinutesSelectButton(30))
    .expect(arrivalInput.textContent).eql('8:30')
    .expect(workingInput.textContent).eql('8:00')
    .expect(lunchInput.textContent).eql('1:00')
    .expect(leaveInput.textContent).eql('17:30')
})

test('Change working', async t => {
  await t
    .click(workingInput)
    .click(getHourSelectButton(9))
    .click(getMinutesSelectButton(15))
    .expect(arrivalInput.textContent).eql('9:00')
    .expect(workingInput.textContent).eql('9:15')
    .expect(lunchInput.textContent).eql('1:00')
    .expect(leaveInput.textContent).eql('19:15')
})

test('Change lunch', async t => {
  await t
    .click(lunchInput)
    .click(getHoursFirstToggleControl())
    .click(getHourSelectButton(2))
    .click(getMinutesSelectButton(15))
    .expect(arrivalInput.textContent).eql('9:00')
    .expect(workingInput.textContent).eql('8:00')
    .expect(lunchInput.textContent).eql('2:15')
    .expect(leaveInput.textContent).eql('19:15')
})

test('Change leave', async t => {
  await t
    .click(leaveInput)
    .click(getHoursLastToggleControl())
    .click(getHourSelectButton(21))
    .click(getMinutesSelectButton(40))
    .expect(arrivalInput.textContent).eql('12:40')
    .expect(workingInput.textContent).eql('8:00')
    .expect(lunchInput.textContent).eql('1:00')
    .expect(leaveInput.textContent).eql('21:40')
})
