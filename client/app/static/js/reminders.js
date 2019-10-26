var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/reminders")
request.onreadystatechange = function () {
  if(request.readyState === 4) {
    console.log(request.status)
    console.log(request.responseText)
    if (request.status === 200){
        const response = JSON.parse(request.responseText)
        for (var i = 0; i < response.reminders.length; i++) {
            var reminderNode = document.createElement("p");
            reminderNode.innerHTML = response.reminders[i];
            var reminderListNode = document.getElementById("reminderList");
            reminderListNode.appendChild(reminderNode); 
        }
    }
    console.log(request.status)
    console.log(request.responseText)
    const response = JSON.parse(request.responseText)
    for (var i = 0; i < response.reminders.length; i++) {
        var reminderNode = document.createElement("p");
        reminderNode.innerHTML = response.reminders[i];
        var reminderListNode = document.getElementById("reminderList");
        reminderListNode.appendChild(reminderNode); 
    }

  }
}
request.onerror = function (_req, _err) { console.log(request.responseText) }
request.send();



