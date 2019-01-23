function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}
//Select a File from the Picture Library 
function openFilePicker(selection) {

  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  var options = setOptions(srcType);
  var func = createNewFileEntry;

  navigator.camera.getPicture(function cameraSuccess(imageUri) {
      displayImage(imageUri);
    

  }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

  }, options);
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  var srcType = Camera.PictureSourceType.CAMERA;
  var options = setOptions(srcType);
  var func = createNewFileEntry;

  navigator.camera.getPicture(function cameraSuccess(imageUri) {

      displayImage(imageUri);
      // You may choose to copy the picture, save it somewhere, or upload.
      //save local version in cookies until browser is rebooted

  }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

  }, options);
}


// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}


function displayImage(imageURI) {
    var image = document.getElementById('wallImage');
    image.src = imageURI;
}

/*
  The code shown here creates a file in your app's cache 
  (in sandboxed storage) named tempFile.jpeg. With the new FileEntry object, 
  you can copy the image to the file or do something else like upload it.
*/ 
function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

    }, onErrorResolveUrl);
}
