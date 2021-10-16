export const Store = {
  setItem: (key: string, value: string) => {
    return Promise.resolve().then(() => {
      localStorage.setItem(key, value)
    })
  },

  getItem: (key: string) => localStorage.getItem(key),
}