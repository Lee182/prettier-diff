const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const prettier = require('prettier')
const uglifyjs = require('uglify-js')
const html2pug = require('html2pug')

app.use(bodyParser.json())
app.use(cors())

app.use('/', express.static(path.join(__dirname, '/dist')))

app.post('/transform-code', (req, res) => {
  let { code, options, name } = req.body
  const transforms = {
    prettier: prettier.format,
    uglifyjs(code, options) {
      const result = uglifyjs.minify(code)
      return result.code || code
    }
  }
  if (!code || !options || !Array.isArray(code) || !name || !transforms[name]) {
    return res.send(401)
  }
  // validate options
  code = code.map(strCode => {
    return transforms[name](strCode, { semi: false })
  })
  res.json({ code, options, date: new Date() })
})

app.post('/html2pug', (req, res) => {
  const { code } = req.body
  const sPug = html2pug(code)
  res.json({ sPug })
})

app.listen(9700, () => {
  console.log(9700)
})
