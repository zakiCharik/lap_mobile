routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  // Left View Pages
  {
    path: '/left-page-1/',
    url: './pages/left-page-1.html',
  },
  {
    path: '/left-page-2/',
    url: './pages/left-page-2.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/category/:Id',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var categoryId = routeTo.params.Id;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        app.request.get('http://localhost/LAP/lap_api/web/app_dev.php/category/'+categoryId, function (data) {
          console.log(JSON.parse(data));
          // Hide Preloader
          app.preloader.hide();

          // Resolve route to load page
          resolve(
            {
              componentUrl: './pages/category-view.html',
            },
            {
              context: {
                category: JSON.parse(data),
              }
            }
          );          
        });

      }, 1000);
    },
  },
  {
    path: '/gamme-load-details/:gammeId',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var gammeId = routeTo.params.gammeId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        console.log('fetch data url : ','http://localhost/LAP/lap_api/web/app_dev.php/gamme/'+gammeId+'/products/');
        app.request.get('http://localhost/LAP/lap_api/web/app_dev.php/gamme/'+gammeId+'/products/', function (data) {
          console.log(JSON.parse(data));
          // Hide Preloader
          app.preloader.hide();

          // Resolve route to load page
          resolve(
            {
              componentUrl: './pages/gamme-details.html',
            },
            {
              context: {
                gamme: JSON.parse(data)[0].gamme.name,
                products: JSON.parse(data),
              }
            }
          );          
        });

      }, 1000);
    },
  },
  {
    path: '/products/:productId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var productId = routeTo.params.productId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request

        app.request.get('http://localhost/LAP/lap_api/web/app_dev.php/subcategory/'+productId+'/products/', function (data) {
          console.log(JSON.parse(data));
          // Hide Preloader
          app.preloader.hide();

          // Resolve route to load page
          resolve(
            {
              componentUrl: './pages/products.html',
            },
            {
              context: {
                products: JSON.parse(data),
              }
            }
          );          
        });

      }, 1000);
    },
  },
  {
    path: '/load-product-details/:productId/:gammeName',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var productId = routeTo.params.productId;
      var gammeName = routeTo.params.gammeName;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request

        app.request.get('http://localhost/LAP/lap_api/web/app_dev.php/product/'+productId, function (data) {
          console.log(JSON.parse(data));
          // Hide Preloader
          app.preloader.hide();

          // Resolve route to load page
          resolve(
            {
              componentUrl: './pages/product-details.html',
            },
            {
              context: {
                ref: JSON.parse(data).ref,
                gamme: JSON.parse(data).gamme.name,
                product: JSON.parse(data),
              }
            }
          );          
        });

      }, 1000);
    },
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request

        app.request.get('http://localhost/LAP/lap_api/web/app_dev.php/category/', function (data) {
          console.log(JSON.parse(data));
          // Hide Preloader
          app.preloader.hide();

          // Resolve route to load page
          resolve(
            {
              componentUrl: './pages/request-and-load.html',
            },
            {
              context: {
                categories: JSON.parse(data),
              }
            }
          );          
        });

      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
