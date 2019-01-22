class FocusController {
  constructor({
    focusedInput,
    inputs = []
  }) {
    this._inputs = inputs

    // TODO: `TimeInput`
    this._activeElement = focusedInput || this._inputs[0]

    this._bindControls()

    this._setActive(this._activeElement)
  }

  _bindControls() {
    this._inputs.forEach(this._bindFocus.bind(this))
  }

  _bindFocus(element) {
    element.addOnFocusListener(element => this._setActive(element))
  }

  _setActive(element) {
    this._inputs.forEach(input => {
      if (input === element) {
        input.setFocusedStyle()
      } else {
        input.removeFocusedStyle()
      }
    })

    this._activeElement = element
  }

  getActiveElement() {
    return this._activeElement
  }
}

export {FocusController}
