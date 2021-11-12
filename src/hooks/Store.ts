import downloadImage from '../hooks/downloadImage'

export const Store = {
  setItem: (key: string, value: string) => {
    return Promise.resolve().then(() => {
      localStorage.setItem(key, value)
    })
  },

  getItem: (key: string) => localStorage.getItem(key),

  saveUserPhoto: (url: string) => {
    downloadImage(url, (base64String) => {
      Store.setItem('photo', base64String)
    })
  }
}