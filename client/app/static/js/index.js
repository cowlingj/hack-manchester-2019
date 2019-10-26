
function sendForm() {

var formData = new FormData();

formData.append("message", document.querySelector('form [name="message"]').innerHTML);

  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/sendmessage")
  request.send(formData);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status === 200) {
        alert("Help was sent");
      } else {
        alert("Something went wrong");      
      }
      console.log(request.status)
      console.log(request.responseText) 
    }
  }
  request.onerror = function (_req, _err) { console.log(request.responseText) }
  request.send(formData);
}