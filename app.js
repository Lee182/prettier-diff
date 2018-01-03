const express = require('express')
const app = express()
const util = require('util')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const prettier = require('prettier')
const uglifyjs = require('uglify-js')
const html2jade = require('html2jade')

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

app.post('/html2pug', async (req, res) => {
  const { code } = req.body
  const convertHtml = util.promisify(html2jade.convertHtml)
  const sPug = await convertHtml(code, { bodyless: true, tabs: false })
  res.json({ sPug })
})

app.listen(9700, () => {
  console.log(9700)
})
