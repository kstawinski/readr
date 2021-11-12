/*
  source:
  https://itqna.net/questions/3174/save-image-link-file-local-storage
*/

const downloadImage = (url, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function(e) {
    if (this.status == 200) {
      const reader = new FileReader()
      reader.onload = function (e) {
        callback.call(callback, e.target.result)
      }
      reader.readAsDataURL(this.response)
    }
  }
  xhr.send()
}

export default downloadImage