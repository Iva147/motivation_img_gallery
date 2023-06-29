const getStorage = (item) => {
  return sessionStorage.getItem(item)
}

const setStorage = (name, item) => {
  return sessionStorage.setItem(name, item)
}

const removeStorage = (item) => {
  return sessionStorage.removeItem(item)
}

export { getStorage, setStorage, removeStorage }