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

    var flash_mode = 'off';
    var flash_on_btn = document.createElement('img');
    flash_on_btn.src = '../img/flash_on.svg';
    flash_on_btn.className += 'btn_class';
    flash_on_btn.className += ' flash_class'


    flash_on_btn.onclick = function() {
        flash_mode = 'on';
        flash_off_btn.style.visibility = 'visible';
        flash_on_btn.style.visibility = 'hidden';

        CameraPreview.setFlashMode(flash_mode);
    }


    var flash_off_btn = document.createElement('img');
    flash_off_btn.src = '../img/flash_off.svg';
    flash_off_btn.className += 'btn_class';
    flash_off_btn.className += ' flash_class'


    flash_off_btn.onclick = function() {
        flash_mode = 'off';
        flash_off_btn.style.visibility = 'hidden';
        flash_on_btn.style.visibility = 'visible';

        CameraPreview.setFlashMode(flash_mode);
    }

    flash_off_btn.style.visibility = 'hidden';
    

    var rect = document.createElement('div');


	var take_pic_btn = document.createElement('img');
    take_pic_btn.src = '../img/btn_icon_mini.png';
    rect.className += 'rect_class';


    document.body.appendChild(rect);
    document.body.appendChild(take_pic_btn);
    document.body.appendChild(flash_on_btn);
    document.body.appendChild(flash_off_btn);
    var rect_coords = rect.getBoundingClientRect();
    var x_coord = rect_coords.left, y_coord = rect_coords.top;


	CameraPreview.startCamera(options);
}