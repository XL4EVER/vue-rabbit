export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  
  export const getStorage = (key) => {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : null
  }
  
  export const removeStorage = (key) => {
    localStorage.removeItem(key)
  }