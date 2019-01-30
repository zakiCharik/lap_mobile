// Dom7
var $$ = Dom7;
var Globalgammes;
// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.lineinteractive.lap', // App bundle ID
  name: 'LAP', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {

      return {
        selectedItem : {
          objectPorduct:null,
          gammeName:'',
          murImage:'',
          murColor:'',
          productName:'',
          color:'',
        },
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };

  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  on: {
    pageInit: function () {
      Framework7.request.get('http://localhost/LAP/lap_api/web/app_dev.php/gamme/', function (data) {

        if (document.querySelector('#categoryWrapper') !== null && document.querySelector('#categoryTemplate') !== null) {
          // for professional search page card details on right hand side
          var template = document.querySelector('#categoryTemplate').innerHTML;
          var template_compiled = Template7(template).compile();
          var Globalgammes = JSON.parse(data);
          var details_compiledRendered = template_compiled({gammes:Globalgammes});
          document.querySelector('#categoryWrapper').innerHTML = details_compiledRendered;
        }
        return {
          user: {
            firstName: 'John',
            lastName: 'Doe',
          },
          gammes : Globalgammes,
        };
      });
    }
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

// Using 'page:init' event handlers for data-name page camerawall
$$(document).on('page:init', '.page[data-name="camerawall"]', function (e, page) {
  cameraPreviewGetPicture();      
  initCameraPreview();      
});//end page init choi-mur
// Using 'page:init' event handlers for data-name page camerawall
$$(document).on('page:init', '.page[data-name="araugmented"]', function (e, page) {
  var World = {

      init: function initFn() {
          this.createOverlays();
      },

      createOverlays: function createOverlaysFn() {
          /*
              First a AR.TargetCollectionResource is created with the path to the Wikitude Target Collection(.wtc) file.
              This .wtc file can be created from images using the Wikitude Studio. More information on how to create them
              can be found in the documentation in the TargetManagement section.
              Each target in the target collection is identified by its target name. By using this
              target name, it is possible to create an AR.ImageTrackable for every target in the target collection.
           */
          this.targetCollectionResource = new AR.TargetCollectionResource("img/magazine.wtc", {
              onError: World.onError
          });

          /*
              This resource is then used as parameter to create an AR.ImageTracker. Optional parameters are passed as
              object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once
              the tracker loaded all of its target images this callback function is invoked. We also set the callback
              function for the onError trigger which provides a sting containing a description of the error.
           */
          this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
              onTargetsLoaded: World.showInfoBar,
              onError: World.onError
          });

          /*
              The next step is to create the augmentation. In this example an image resource is created and passed to the
              AR.ImageDrawable. A drawable is a visual component that can be connected to a Trackable
              (AR.ImageTrackable, AR.InstantTrackable or AR.ObjectTrackable) or a geolocated object (AR.GeoObject). The
              AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for transformations
              relative to the recognized target.
          */

          /* Create overlay for page one of the magazine. */
          var imgOne = new AR.ImageResource("img/imageOne.png", {
              onError: World.onError
          });
          var overlayOne = new AR.ImageDrawable(imgOne, 1, {
              translate: {
                  x: -0.15
              }
          });

          /*
              The last lines combine everything by creating an AR.ImageTrackable with the previously created tracker,
              the name of the image target and the drawable that should augment the recognized image.
              Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
              Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a
              certain group of targets.
          */
          this.pageOne = new AR.ImageTrackable(this.tracker, "pageOne", {
              drawables: {
                  cam: overlayOne
              },
              onImageRecognized: World.hideInfoBar,
              onError: World.onError
          });
      },

      onError: function onErrorFn(error) {
          alert(error)
      },

      hideInfoBar: function hideInfoBarFn() {
          document.getElementById("infoBox").style.display = "none";
      },

      showInfoBar: function worldLoadedFn() {
          document.getElementById("infoBox").style.display = "table";
          document.getElementById("loadingMessage").style.display = "none";
      }
  };

  World.init();   
});//end page init choi-mur

// Using 'page:init' event handlers for data-name page  choix-mur
$$(document).on('page:init', '.page[data-name="choix-mur"]', function (e, page) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  Framework7.request.get('http://localhost/LAP/lap_api/web/app_dev.php/gamme/', function (data) {
    console.log('DATA',JSON.parse(data));

    if (document.querySelector('#gammeWrapper1') !== null && document.querySelector('#gammeTemplate1') !== null) {
      // for professional search page card details on right hand side
      var template = document.querySelector('#gammeTemplate1').innerHTML;
      var template_compiled = Template7(template).compile();
      var thisGlobalgammes = JSON.parse(data);
      var details_compiledRendered = template_compiled({gammes:thisGlobalgammes});
      document.querySelector('#gammeWrapper1').innerHTML = details_compiledRendered;
    }
    return {
      gammes : thisGlobalgammes,
    };
  });

});//end page init choi-mur

  
// // Init/Create left panel view
// var mainView = app.views.create('.view-left', {
//   url: '/'
// });

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});


//=========================================================/
//=========================================================/

//Intercat


// target elements with the "draggable" class
interact('.resize-drag')

  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    // keep the edges inside the parent
    restrictEdges: {
      outer: 'parent',
      endOnly: true,
    },

    // minimum size
    restrictSize: {
      min: { width: 100, height: 50 },
    },

    inertia: true,
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

// target elements with the "draggable" class
interact('.resize-drag')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      // var textEl = event.target.querySelector('p');

      // textEl && (textEl.textContent =
      //   'moved a distance of '
      //   + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
      //                Math.pow(event.pageY - event.y0, 2) | 0))
      //       .toFixed(2) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
  
//=========================================================/
//=========================================================/