const express = require('express')
const app = express()
const port = 3000
var clockwork = require('clockwork')({key:'84b3b39adaeacdb378a174c2fedb58cc62dcd01e'});
var arrayReminders = ["Take medication","Go for a walk","Call your family"];

// use this to test the endpoint runnning 
//app.get('test', (req, res) => { res.json({ key: "It's working"}) });

app.post('/sendmessage', (req, res) => { 
    clockwork.sendSms({ To: '447758941459', Content: 'Hello World'}, 
        function(error, resp) {
            if (error) {
                console.log('Something went wrong', error);
            } else {
            console.log('Message sent',resp.responses[0].id);
            }
        });

        res.sendStatus(200);
});


app.get('/reminder', (req, res) => {
        res.json({reminders: arrayReminders})
        JSON.parse();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
