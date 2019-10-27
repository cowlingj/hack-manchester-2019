  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(pos){
      document.querySelector('form [name="latitude"]').value = pos.coords.latitude
      document.querySelector('form [name="longitude"]').value = pos.coords.longitude
    }, function(err) {
      console.log(err)
    })
  } else {
    console.log('geolocation unavailable')
  }