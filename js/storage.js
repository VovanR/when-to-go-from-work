class Storage {
  save(type, value) {
    window.localStorage.setItem(type, JSON.stringify(value))
  }

  load(type) {
    try {
      return JSON.parse(window.localStorage.getItem(type))
    } catch (error) {
      return null
    }
  }

  delete(type) {
    window.localStorage.removeItem(type)
  }
}

export {Storage}
