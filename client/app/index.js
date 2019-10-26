const express = require('express')
const path = require('path')
const app = express()
const port = 3001

app.get('/', (_req, res) => { res.sendFile(path.join(__dirname, 'static', 'html', 'index.html')) })
app.get('/*', express.static(path.join(__dirname, 'static', 'html')))
app.use('/static', express.static(path.join(__dirname, 'static')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))