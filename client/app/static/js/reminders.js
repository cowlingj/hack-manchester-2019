var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/reminders")
request.onreadystatechange = function () {
  if(request.readyState === 4) {
    console.log(request.status)
    console.log(request.responseText)
    if (request.status === 200){
        const response = JSON.parse(request.responseText)
        for (var i = 0; i < response.reminders.length; i++) {
            var reminderElement = document.createElement("div");
            reminderElement.classList.add('row', 'reminder');

            var reminderTextElement = document.createElement("p");
            reminderTextElement.classList.add('col-8');
            reminderTextElement.innerHTML = response.reminders[i];

            var reminderButtonElement = document.createElement('button');
            reminderButtonElement.classList.add('col-4');
            reminderButtonElement.innerHTML = 'done';

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
