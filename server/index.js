require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
var clockwork = require('clockwork')({key:'84b3b39adaeacdb378a174c2fedb58cc62dcd01e'});
var carernotify1 = new Date();
carernotify1.setMinutes(carernotify1.getMinutes() + 1);
var carernotify2 = new Date();
carernotify2.setMinutes(carernotify2.getMinutes() + 1);
var carernotify3 = new Date();
carernotify3.setMinutes(carernotify3.getMinutes() + 1);

var arrayReminders = [
    {id:"1", message:"Take medication", notify: new Date(), carernotify: carernotify1},
    {id:"2", message: "Go for a walk", notify: new Date(), carernotify: carernotify2},
    {id:"3", message:"Call your family", notify: new Date(), carernotify: carernotify3}
];

function notifycarer(){
    const expiredReminders = arrayReminders.filter( (reminder) => {
        return new Date() >= reminder.carernotify;
        });
       if(expiredReminders.length > 0){
        const expiredRemindersString = expiredReminders.map((reminder) => reminder.message).join("\n");
        clockwork.sendSms({ To: process.env.NUMBER, Content: 'The patient did not do:\n' + expiredRemindersString}, 
            function(error, resp) {
            if (error) {
                console.log('Something went wrong', error);
            } else {
            console.log('Message sent',resp.responses[0].id);
                }
            });
       }
}

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
   var reminders =  arrayReminders.filter(function(reminder){
        return reminder.notify <= new Date();
    }).map(function(reminder){
        const {notify, ...rest} = reminder;
        return rest;
    })    
    res.json({reminders})
});

app.post('/reminders/done/:id', (req, res) => {
    let obj = arrayReminders.find(obj => obj.id == req.params.id);
    //obj.notify.setDate(obj.notify.getDate() + 1);
    obj.notify.setMinutes(obj.notify.getMinutes() + 2);
    obj.carernotify = new Date(obj.notify);
    obj.carernotify.setMinutes(obj.carernotify.getMinutes() + 1);
    res.sendStatus(200);
});

app.use("*", (req, res) => {
    res.sendStatus(400);
});

setInterval(notifycarer, 32000);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))