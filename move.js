const fs = require('fs')
const path = require('path')
const sourceFolder = '/Users/felipe.nevarez/Desktop'
const screenshotsFolder = '/Users/felipe.nevarez/Desktop/screenshots'

function getScreenshots() {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceFolder,{ endcoding: 'utf-8'}, (err, data) => {
      if(err) return reject(err)
      data = data.filter(file => file.indexOf('Screen Shot') === 0)
      resolve(data)
    })
  })
}

function moveFile(file) {
  return new Promise((resolve, reject) => {
    fs.rename(path.join(sourceFolder, file), path.join(screenshotsFolder, file), (err) => {
      if(err) return reject(err)
      resolve()
    })
  })
}

function moveAllFiles(files) {
  return Promise.all(files.map(f => moveFile(f)))
}

getScreenshots()
  .then((data) => {
    console.log(data)
    return data
  })
  .then(moveAllFiles)
  .catch(err => {
    console.log(err)
  })
