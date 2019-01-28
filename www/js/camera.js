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
    var image = document.createElement("IMG");   
    image.src = imageURI;
    var wall = document.getElementById('wallImage');
    wall.appendChild(image);
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


var cameraPreviewGetPicture  = function () {
    // Method below REQUIRES elements we removed from body in index.html
    // So we should comment it out.
    // this.receivedEvent('deviceready');

    let options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: true,
        tapPhoto: false,
        tapFocus: true,
        previewDrag: false
    };

    var flash_mode = 'off';
    // Take a look at docs: https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview#methods
    CameraPreview.startCamera(options);


    // Create a rectangle & take_pic_btn
    var rect = document.createElement('div');
    var take_pic_btn = document.createElement('img');
    var flash_on_btn = document.createElement('img');
    var flash_off_btn = document.createElement('img');
    // Make take_pic_btn look nice
    // You must specify path relative to www folder
    take_pic_btn.src = 'img/btn_icon_mini.png';
    flash_on_btn.src = 'img/flash_on.svg';
    flash_off_btn.src = 'img/flash_off.svg';

    // Add styles
    rect.className += 'rect_class';
    take_pic_btn.className += 'btn_class';
    flash_on_btn.className += 'btn_class';
    flash_off_btn.className += 'btn_class';

    take_pic_btn.className += ' take_pic_class'
    flash_on_btn.className += ' flash_class'
    flash_off_btn.className += ' flash_class'

    // Hide flash_off btn by default
    flash_off_btn.style.visibility = 'hidden';

    // Append to body section
    document.body.appendChild(rect);
    document.body.appendChild(take_pic_btn);
    document.body.appendChild(flash_on_btn);
    document.body.appendChild(flash_off_btn);

    // Get rectangle coordinates
    var rect_coords = rect.getBoundingClientRect();
    var x_coord = rect_coords.left, y_coord = rect_coords.top;

    take_pic_btn.onclick = function(){
        // Get rect width and height
        var rect_width = rect.offsetWidth, rect_height = rect.offsetHeight;

        CameraPreview.takePicture(function(base64PictureData) {

            // We pass width, height, x and y coordinates of our rectangle to crop func
            // BEFORE crop function ends, it sends cropped base64 image to a server
            var cropped_img = crop(base64PictureData, rect_width, rect_height, x_coord, y_coord, function(cropped_img_base64) {
              console.log('Take picture to persisting');
                // $.post("http://192.168.1.32:8000/api/images/create/",
                //     {
                //         image: cropped_img_base64
                //     },
                //     function(data, status, xhr) {
                //         // Success callback
                //         alert('Status: ' + status + '\nData: ' + data);
                //     }
                // )
                // .fail(function(error, status, xhr) {
                //     // Failure callback
                //     alert('Status: ' + status + '\nReason: ' + xhr);
                // });

            });
        });
    };

    flash_on_btn.onclick = function() {
        flash_mode = 'on';
        flash_off_btn.style.visibility = 'visible';
        flash_on_btn.style.visibility = 'hidden';

        CameraPreview.setFlashMode(flash_mode);
    }

    flash_off_btn.onclick = function() {
        flash_mode = 'off';
        flash_off_btn.style.visibility = 'hidden';
        flash_on_btn.style.visibility = 'visible';

        CameraPreview.setFlashMode(flash_mode);
    }
};

// crop.js

var crop = function(base64PictureData, rect_width, rect_height, x_coord, y_coord, callback) {

    // image variable will contain ORIGINAL image
    var image = new Image();

    // canvas variable will contain CROPPED image
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Load original image onto image object
    image.src = 'data:image/png;base64,' + base64PictureData;
    image.onload = function(){

        // Map rectangle onto image taken
        var x_axis_scale = image.width / window.screen.width
        var y_axis_scale = image.height / window.screen.height
        // INTERPOLATE
        var x_coord_int = x_coord * x_axis_scale;
        var y_coord_int = y_coord * y_axis_scale;
        var rect_width_int = rect_width * x_axis_scale;
        var rect_height_int = rect_height * y_axis_scale

        // Set canvas size equivalent to cropped image size
        canvas.width = rect_width_int;
        canvas.height = rect_height_int;

        ctx.drawImage(image,
            x_coord_int, y_coord_int,           // Start CROPPING from x_coord(interpolated) and y_coord(interpolated)
            rect_width_int, rect_height_int,    // Crop interpolated rectangle
            0, 0,                               // Place the result at 0, 0 in the canvas,
            rect_width_int, rect_height_int);   // Crop interpolated rectangle

        // Get base64 representation of cropped image
        var cropped_img_base64 = canvas.toDataURL();

        // Now we are ready to send cropped image TO SERVER
        callback(cropped_img_base64);

        return cropped_img_base64;
    };
};