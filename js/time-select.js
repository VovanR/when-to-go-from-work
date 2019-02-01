import {
  createElement,
  noop
} from './utils.js'

class TimeSelect {
  constructor({
    element,
    onChange
  }) {
    this._element = element
    this._onChange = onChange || noop

    this._build()
    this._bindControls()
  }

  _build() {
    const $fragment = document.createDocumentFragment()
    $fragment.append(this._buildHours())
    $fragment.append(this._buildMinutes())

    this._element.append($fragment)
  }

  _bindControls() {
    this._element.addEventListener('click', e => {
      if (e.target.classList.contains('time-select__button')) {
        const {
          type,
          value
        } = e.target.dataset

        this._onChange({
          type,
          value: Number(value)
        })
      }
    })
  }

  _buildHours() {
    const $togglerFirst = this._buildToggler()
    const $togglerLast = this._buildToggler()

    $togglerFirst.addEventListener('click', e => {
      toggleNextSiblings(e.target)
    })
    $togglerLast.addEventListener('click', e => {
      togglePreviousSiblings(e.target)
    })

    const $controlSet = this._buildControlSet('hours', 0, 23)
    this._hideItems(0, 7, $controlSet)
    this._hideItems(20, 23, $controlSet)

    return createElement({
      className: 'time-select__hours',
      children: [
        this._buildLabel('hours'),
        $togglerFirst,
        $controlSet,
        $togglerLast
      ]
    })
  }

  _buildMinutes() {
    return createElement({
      className: 'time-select__minutes',
      children: [
        this._buildLabel('minutes'),
        this._buildControlSet('minutes', 0, 55, 5)
      ]
    })
  }

  _buildControlSet(type, from, to, step = 1) {
    const $fragment = document.createDocumentFragment()

    for (let i = from; i <= to; i += step) {
      $fragment.append(this._buildControl(type, i))
    }

    return $fragment
  }

  _buildControl(type, value, name) {
    return createElement({
      type: 'button',
      className: 'time-select__button',
      text: name || value,
      attributes: {
        type: 'button'
      },
      dataset: {
        value,
        type
      }
    })
  }

  _buildLabel(name) {
    return createElement({
      className: 'time-select__label',
      text: name
    })
  }

  _hideItems(from, to, $items) {
    [...$items.children].forEach(($item, index) => {
      if (index >= from && index <= to) {
        $item.disabled = true
        $item.dataset.togglable = 'true'
      }
    })
  }

  _buildToggler() {
    return createElement({
      type: 'button',
      className: 'time-select__toggle-controls',
      text: '···',
      attributes: {
        type: 'button'
      }
    })
  }
}

function toggleNextSiblings($toggler) {
  toggleSiblings($toggler, $block => $block.nextSibling)
}

function togglePreviousSiblings($toggler) {
  toggleSiblings($toggler, $block => $block.previousSibling)
}

function toggleSiblings($toggler, nextElementGetter) {
  let outOfRange = false
  for (let $next = nextElementGetter($toggler); $next; $next = nextElementGetter($next)) {
    if ($next.dataset.togglable) {
      if (outOfRange) {
        $next.disabled = true
      } else {
        $next.disabled = !$next.disabled
      }
    } else {
      outOfRange = true
    }
  }
}

export {TimeSelect}
