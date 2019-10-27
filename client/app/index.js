const express = require('express')
const path = require('path')
const app = express()
const port = 3001
require('dotenv').config()

app.use(require('morgan')('tiny'))
app.get('/serverAddress.js', (_req, res) => {
  res.type('text/javascript')
  res.send("window.serverAddress = \"" + process.env.SERVER_ADDRESS + "\"")
})
app.get('/', (_req, res) => { res.sendFile(path.join(__dirname, 'static', 'html', 'index.html')) })
app.get('/*', express.static(path.join(__dirname, 'static', 'html')))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use((req, res) => { res.sendStatus(404) })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))