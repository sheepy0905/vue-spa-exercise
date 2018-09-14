const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const isProd = typeof process.env.NODE_ENV !== 'undefined' && (process.env.NODE_ENV === 'production')

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

if (isProd) {
  app.use('/', express.static(path.resolve(__dirname, './dist')))
} else {
  console.log("this is non-production environment.")
  app.use('/dist', express.static(path.resolve(__dirname, './dist')))
}

require("./build/dev-server")(app)

// if (isProd) {
//   const bundlePath = path.resolve(__dirname, './dist/server/main.js')
//   renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
// } else {
//   require('./build/dev-server')(app, bundle => {
//     renderer = createBundleRenderer(bundle)
//   })
// }

// app.get('*', (req, res) => {
//   const context = { url: req.url }
//   renderer.renderToString(context, (err, html) => {
//     if (err) {
//       return res.status(500).send('Server Error')
//     }
//     html = indexHTML.replace('{{ APP }}', html)
//     html = html.replace('{{ STATE }}',
//       `<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
//     res.write(html)
//     res.end()
//   })
// })

app.get('*', (req, res) => {
  res.write(indexHTML)
  res.end()
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
