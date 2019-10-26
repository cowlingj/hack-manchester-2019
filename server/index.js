const express = require('express')
const app = express()
const port = 3000
var clockwork = require('clockwork')({key:'84b3b39adaeacdb378a174c2fedb58cc62dcd01e'});


app.get('/', (req, res) => res.json({key:  "value"}))

app.post('/immediate-help', (req, res) => { /* talk to clockwork */ res.sendStatus(200) })

app.get('/test', (req, res) => { res.send("Hello World") });

app.get('/sendMessage', (req, res) => { 
    clockwork.sendSms({ To: '447758941459', Content: 'Hello World'}, 
        function(error, resp) {
            if (error) {
                console.log('Something went wrong', error);
            } else {
            console.log('Message sent',resp.responses[0].id);
            }
        });

        res.send("The message was sent");
});

app.get('');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
