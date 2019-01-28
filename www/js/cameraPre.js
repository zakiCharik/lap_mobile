var cameraPreviewGetPicture  = function () {
	
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
	alert('1');
    var flash_mode = 'off';
    var flash_on_btn = document.createElement('img');
    flash_on_btn.src = 'img/flash_on.svg';
    flash_on_btn.className += 'btn_class';
    flash_on_btn.className += ' flash_class'
	alert('2');

    flash_on_btn.onclick = function() {
        flash_mode = 'on';
        flash_off_btn.style.visibility = 'visible';
        flash_on_btn.style.visibility = 'hidden';

        CameraPreview.setFlashMode(flash_mode);
    }
	alert('3');

    var flash_off_btn = document.createElement('img');
    flash_off_btn.src = 'img/flash_off.svg';
    flash_off_btn.className += 'btn_class';
    flash_off_btn.className += ' flash_class'

	alert('4');
    flash_off_btn.onclick = function() {
        flash_mode = 'off';
        flash_off_btn.style.visibility = 'hidden';
        flash_on_btn.style.visibility = 'visible';

        CameraPreview.setFlashMode(flash_mode);
    }
	alert('5');
    flash_off_btn.style.visibility = 'hidden';
    
	alert('6');
    var rect = document.createElement('div');

	alert('7');
	var take_pic_btn = document.createElement('img');
    take_pic_btn.src = 'img/btn_icon_mini.png';
    rect.className += 'rect_class';

	alert('8');
    // Append to body section
    document.body.appendChild(rect);
    document.body.appendChild(take_pic_btn);
    document.body.appendChild(flash_on_btn);
    document.body.appendChild(flash_off_btn);
    var rect_coords = rect.getBoundingClientRect();
    var x_coord = rect_coords.left, y_coord = rect_coords.top;


	alert('9');
	CameraPreview.startCamera(options);
}