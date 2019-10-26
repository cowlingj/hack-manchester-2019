function markReminderAsDone(id) {
  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/reminders/done/" + id)
  request.onreadystatechange = function () {
    if(request.readyState === 4 && request.status === 200) {
      const toRemove = document.getElementsByClassName('reminder-' + id)[0]
      toRemove.parentNode.removeChild(toRemove)
    }
  }
  request.send();
}

var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/reminders")
request.onreadystatechange = function () {
  if(request.readyState === 4) {
    console.log(request.status)
    console.log(request.responseText)
    if (request.status === 200){
        const response = JSON.parse(request.responseText)
        for (var i = 0; i < response.reminders.length; i++) {
            const reminderIndex = i;
            var reminderElement = document.createElement("div");
            reminderElement.classList.add('row', 'reminder');

            var reminderTextElement = document.createElement("p");
            reminderTextElement.classList.add('col-8', 'reminderText');

            var reminderButtonElement = document.createElement('button');
            reminderButtonElement.classList.add('col-4');
            reminderButtonElement.innerHTML = 'done';

            if (typeof response.reminders[reminderIndex] === 'string') {
              reminderTextElement.innerHTML = response.reminders[i];
            } else {
              reminderElement.classList.add('reminder-' + response.reminders[i].id)
              reminderTextElement.innerHTML = response.reminders[i].message;
              reminderButtonElement.onclick = function() {
                console.log("clicked: "+reminderIndex);
                markReminderAsDone(response.reminders[reminderIndex].id); 
              }
            }

            var reminderListElement = document.getElementById("reminderList");
            reminderElement.appendChild(reminderTextElement);
            reminderElement.appendChild(reminderButtonElement);
            reminderListElement.appendChild(reminderElement); 
        }
    }
  }
}
request.onerror = function (_req, _err) { console.log(request.responseText) }
request.send();
