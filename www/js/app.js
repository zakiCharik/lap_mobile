// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    Framework7.request.get('http://localhost/LAP/lap_api/web/app_dev.php/subcategory/', function (data) {
      console.log('DATA',JSON.parse(data));
      // for professional search page card details on right hand side
      var template = document.querySelector('#categoryTemplate').innerHTML;
      var template_compiled = Template7(template).compile();
      var categories = JSON.parse(data);
      var details_compiledRendered = template_compiled({categories:categories});
      document.querySelector('#categoryWrapper').innerHTML = details_compiledRendered;
      return {
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };
    });

  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  on: {
    pageInit: function () {

    }
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});


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
