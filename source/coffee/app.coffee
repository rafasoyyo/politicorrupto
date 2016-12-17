# Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyACFYYD9sdGg5Va_pmPi8MAPRSTMsPX1bM",
    authDomain: "politicorrupto-f320f.firebaseapp.com",
    databaseURL: "https://politicorrupto-f320f.firebaseio.com",
    storageBucket: "politicorrupto-f320f.appspot.com",
    messagingSenderId: "105923145713"
})

# Initialize Angular
ptcApp = angular.module('politicorrupto', [
    'ui.router',
    'firebase',
    'lumx'
    ])


ptcApp.constant('config', {
    mediaURL: '/media/'
    userlogo: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-128.png'
})


ptcApp.config(($stateProvider, $urlRouterProvider)->

    $urlRouterProvider.otherwise("/")

    $stateProvider.state('app', {
        url: "",
        abstract: true,
        views:
            header:
                templateUrl: "templates/header.html"
                controller: "app-Ctrl"
    })

    $stateProvider.state('app.home', {
        url: "/",
        views:
            "main@" :
                templateUrl: "templates/home.html"
                controller: "home-Ctrl"
    })
)

