
function sendForm() {

  var formData = new FormData();

  formData.append("message", document.querySelector('form [name="message"]').innerHTML);

  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/sendmessage")
  request.send(formData);
  request.onreadystatechange = function () {
    if(request.readyState === 4) {
      console.log(request.status)
      console.log(request.responseText)
      window.location = '/index.html'
    }
  }
  request.onerror = function (_req, _err) { console.log(request.responseText) }
  request.send(formData);
}