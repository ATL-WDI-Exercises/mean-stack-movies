const app = angular.module('moviesApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/templates/home.html',
    controller: 'homeCtrl',
    controllerAs: '$ctrl'
  });
  $stateProvider
  .state('about', {
    url: '/about',
    templateUrl: '/templates/about.html',
    controller: 'aboutCtrl',
    controllerAs: '$ctrl'
  });
  $urlRouterProvider.otherwise("/");
  // $locationProvider.html5Mode({ enabled: true, requireBase: false });
});
app.controller('homeCtrl', function() {
  this.title = 'Welcome to My Movies App';
});
app.controller('aboutCtrl', function() {
  this.title = 'About my Movies App';
});
