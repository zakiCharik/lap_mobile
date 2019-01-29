var cameraPreviewGetPicture  = function () {
	
	let options = {
	  x: 0,
	  y: 0,
	  width: window.screen.width,
	  height: window.screen.height,
	  camera: CameraPreview.CAMERA_DIRECTION.BACK,
	  toBack: false,
	  tapPhoto: true,
	  tapFocus: false,
	  previewDrag: false
	};
	console.log('-------------------------------Start Camera');
    CameraPreview.setFocusMode(CameraPreview.FOCUS_MODE.CONTINUOUS_PICTURE);
	CameraPreview.setZoom(1);
    CameraPreview.startCamera(options);

	/*
	* BUTTON FLASH MODE ON
	*/
	console.log('-------------------------------Start Flash mode On');
    var flash_mode = 'off';
    var flash_on_btn = document.createElement('img');
    flash_on_btn.src = '../img/flash_on.svg';
    flash_on_btn.className += 'btn_class';
    flash_on_btn.className += ' flash_class';
    flash_on_btn.onclick = function() {
        flash_mode = 'on';
        flash_off_btn.style.visibility = 'visible';
        flash_on_btn.style.visibility = 'hidden';
        CameraPreview.setFlashMode(flash_mode);
    }
    /*
    * BUTTON FLASH MODE ON
    */

    /*
    * BUTTON FLASH MODE OFF
    */
	console.log('-------------------------------Start Flash mode Off');
    var flash_off_btn = document.createElement('img');
    flash_off_btn.src = '../img/flash_off.svg';
    flash_off_btn.className += 'btn_class';
    flash_off_btn.className += ' flash_class';
    flash_off_btn.onclick = function() {
        flash_mode = 'off';
        flash_off_btn.style.visibility = 'hidden';
        flash_on_btn.style.visibility = 'visible';

        CameraPreview.setFlashMode(flash_mode);
    }
    flash_off_btn.style.visibility = 'hidden';
    /*
    * BUTTON FLASH MODE OFF
    */    

    /*
    * RECT FOR CROPING AN AREA
    */  
	console.log('-------------------------------Start RECT');
    var rect = document.createElement('div');
    rect.className += 'rect_class';
    /*
    * RECT FOR CROPING AN AREA
    */  

    /*
    * BUTTON FOR TAKING PICTURE
    */ 
	console.log('-------------------------------Start Button take picture');
	var take_pic_btn = document.createElement('img');
    take_pic_btn.src = '../img/btn_icon_mini.png';
    take_pic_btn.onclick = function(){
		CameraPreview.takePicture({width:640, height:640, quality: 85}, function(base64PictureData){
		  /*
		    base64PictureData is base64 encoded jpeg image. Use this data to store to a file or upload.
		    Its up to the you to figure out the best way to save it to disk or whatever for your application.
		  */

		  // One simple example is if you are going to use it inside an HTML img src attribute then you would do the following:
		  imageSrcData = 'data:image/jpeg;base64,' +base64PictureData;
	      var imageSrcLocation = document.createElement('img');
		  $(imageSrcLocation).attr('src', imageSrcData);
		  $('div#wallImage').append(imageSrcLocation);
		});
    };
    /*
    * BUTTON FOR TAKING PICTURE
    */ 
    document.body.appendChild(flash_on_btn);
    document.body.appendChild(flash_off_btn);
    document.body.appendChild(rect);
    document.body.appendChild(take_pic_btn);

}