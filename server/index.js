require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
var clockwork = require('clockwork')({key:'84b3b39adaeacdb378a174c2fedb58cc62dcd01e'});
var arrayReminders = [
    {id:"1", message:"Take medication", notify: new Date()},
    {id:"2", message: "Go for a walk", notify: new Date()},
    {id:"3", message:"Call your family", notify: new Date()}
];

app.use(require('morgan')('tiny'))
app.use(cors({origin: "*"}));

// use this to test the endpoint runnning 
//app.get('test', (req, res) => { res.json({ key: "It's working"}) });

app.post('/sendmessage', (req, res) => { 
    clockwork.sendSms({ To: process.env.NUMBER, Content: 'Hello World'}, 
        function(error, resp) {
            if (error) {
                console.log('Something went wrong', error);
            } else {
            console.log('Message sent',resp.responses[0].id);
            }
        });

        res.sendStatus(200);
});

app.get('/reminders', (req, res) => {
    console.log(arrayReminders);
   var reminders =  arrayReminders.filter(function(reminder){
        return reminder.notify <= new Date();
    }).map(function(reminder){
        const {notify, ...rest} = reminder;
        return rest;
    })
    console.log(reminders);    
    res.json({reminders})
});

app.post('/reminders/done/:id', (req, res) => {
    console.log(arrayReminders);
    let obj = arrayReminders.find(obj => obj.id == req.params.id);
    obj.notify.setDate(obj.notify.getDate() + 1);
    console.log(arrayReminders);
    res.sendStatus(200);
});

app.use("*", (req, res) => {
    res.sendStatus(400);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))