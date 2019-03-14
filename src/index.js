var fs = require('fs')
const uuidv4 = require('uuid/v4')
const { ordered, lib } = require('emojilib')

const generateEmojiSnippet = (name, char) => {
  return new Promise((resolve, reject) => {
    const uid = uuidv4().toUpperCase()
    const entry = {
      alfredsnippet: {
        uid: uid,
        keyword: `${name}`,
        snippet: char,
        name: `${char} :${name}:`,
        dontautoexpand: false
      }
    }
    fs.writeFile(`dist/${uid}.json`, JSON.stringify(entry, null, 2), (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

async function main () {
  Promise.all(ordered.map(name => generateEmojiSnippet(name, lib[name].char)))
}

main()
