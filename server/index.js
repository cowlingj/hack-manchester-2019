const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.json({key:  "value"}))

app.post('/immediate-help', (req, res) => { /* talk to clockwork */ res.sendStatus(200) })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))