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

	CameraPreview.startCamera(options);
}