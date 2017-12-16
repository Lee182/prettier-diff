const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const prettier = require('prettier')
const uglifyjs = require('uglify-js')

app.use(bodyParser.json())
app.use(cors())

app.use('/', express.static(path.join(__dirname, '/dist')))

app.post('/transform-code', (req, res) => {
  let {code, options, name} = req.body
  const transforms = {
    prettier: prettier.format,
    uglifyjs (code, options) {
      const result = uglifyjs.minify(code)
      return result.code || code
    }
  }
  if (!code || !options || !Array.isArray(code) || !name || !transforms[name]) {
    return res.send(401)
  }
  // validate options
  code = code.map((strCode) => {
    return transforms[name](strCode, {semi: false})
  })
  res.json({code, options, date: new Date()})
})
app.listen(9700, () => {
  console.log(9700)
})
