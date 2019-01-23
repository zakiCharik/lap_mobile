
// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.FILE_URI });
}


// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}


function onSuccess(imageURI) {
    var image = document.getElementById('wallImage');
    image.src = imageURI;
}
