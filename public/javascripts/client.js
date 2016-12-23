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
  $stateProvider
  .state('movies', {
    url: '/movies',
    templateUrl: '/templates/movies/index.html',
    controller: 'moviesCtrl',
    controllerAs: '$ctrl'
  });
  $stateProvider
  .state('newMovie', {
    url: '/movies/new',
    templateUrl: '/templates/movies/new.html',
    controller: 'moviesNewCtrl',
    controllerAs: '$ctrl'
  });
  $stateProvider
  .state('movieDetail', {
    url: '/movies/:id',
    templateUrl: '/templates/movies/show.html',
    controller: 'moviesDetailCtrl',
    controllerAs: '$ctrl'
  });
  $urlRouterProvider.otherwise("/");
  // $locationProvider.html5Mode({ enabled: true, requireBase: false });
});
app.service('moviesService', function($http) {
  console.log('moviesService is alive!');
  this.getMovies = function() {
    return $http.get('/api/movies');
  };
  this.getMovie = function(id) {
    return $http.get('/api/movies/' + id);
  };
  this.addMovie = function(movie) {
    return $http.post('/api/movies', movie);
  };
});
app.controller('homeCtrl', function() {
  this.title = 'Welcome to My Movies App';
});
app.controller('aboutCtrl', function() {
  console.log('aboutCtrl is alive!');
  this.title = 'About my Movies App';
});
app.controller('moviesCtrl', function(moviesService) {
  console.log('moviesCtrl is alive!');
  this.movies = [];
  moviesService.getMovies()
  .then( (response) => {
    this.movies = response.data.movies;
  })
  .catch(function(err) {
    alert('ERROR: ' + err);
  });
});
app.controller('moviesDetailCtrl', function($stateParams, moviesService) {
  console.log('moviesDetailCtrl is alive!');
  moviesService.getMovie($stateParams.id)
  .then( (response) => {
    this.movie = response.data.movie;
  })
  .catch(function(err) {
    alert('ERROR: ' + err);
  });
});
app.controller('moviesNewCtrl', function($state, moviesService) {
  console.log('moviesNewCtrl is alive!');
  this.movie = {
    title: '',
    genre: ''
  };
  this.submit = function() {
    moviesService.addMovie(this.movie)
    .then( (response) => {
      $state.go('movies');
    })
    .catch(function(err) {
      alert('ERROR: ' + err);
    });
  };
});
