class FocusController {
  constructor(props) {
    this._inputs = props.inputs

    this._activeClassName = 'time-input__input_focus'
    this._activeElement = this._inputs[0]

    this._bindControls()
  }

  _bindControls() {
    this._inputs.forEach(this._bindFocus.bind(this))
  }

  _bindFocus(element) {
    element.addEventListener('focus', ({target}) => this._setActive(target))
  }

  _setActive(element) {
    this._inputs.forEach(input => {
      if (input === element) {
        input.classList.add(this._activeClassName)
      } else {
        input.classList.remove(this._activeClassName)
      }
    })

    this._activeElement = element
  }

  getActiveElement() {
    return this._activeElement
  }
}

export {FocusController}
