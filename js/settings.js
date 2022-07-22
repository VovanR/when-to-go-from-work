import {Value} from './value.js'

class Settings {
  constructor() {
    this._predefined = new Map()
    this._userDefaults = new Map()
  }

  /**
   * Use on Application init
   * @param {object} settings - key value object
   */
  setPredefined(settings) {
    Object.entries(settings).forEach(([key, value]) => {
      this._predefined.set(key, new Value(value).toMilliseconds())
    })
  }

  /**
   * Loaded from local storage (saved user settings)
   * @param {object} settings - key value object
   */
  setDefaults(settings) {
    Object.entries(settings).forEach(([key, value]) => {
      this._userDefaults.set(key, value)
    })
  }

  setOption(name, value) {
    this._userDefaults.set(name, value)
  }

  deleteOption(name) {
    this._userDefaults.delete(name)
  }

  getOption(name) {
    const userDefaultOption = this._userDefaults.get(name)
    if (typeof userDefaultOption !== 'undefined') {
      return userDefaultOption
    }

    return this._predefined.get(name)
  }

  reset() {
    this._userDefaults.clear()
  }

  getUserDefaults() {
    const acc = {}

    this._userDefaults.forEach((value, key) => {
      acc[key] = value
    })

    return acc
  }
}

export {Settings}
