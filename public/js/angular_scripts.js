var ptcApp;

firebase.initializeApp({
  apiKey: "AIzaSyACFYYD9sdGg5Va_pmPi8MAPRSTMsPX1bM",
  authDomain: "politicorrupto-f320f.firebaseapp.com",
  databaseURL: "https://politicorrupto-f320f.firebaseio.com",
  storageBucket: "politicorrupto-f320f.appspot.com",
  messagingSenderId: "105923145713"
});

ptcApp = angular.module('politicorrupto', ['ui.router', 'firebase', 'lumx']);

ptcApp.constant('config', {
  mediaURL: '/media/',
  userlogo: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-128.png'
});

ptcApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider.state('app', {
    url: "",
    abstract: true,
    views: {
      header: {
        templateUrl: "templates/header.html",
        controller: "app-Ctrl"
      }
    }
  });
  return $stateProvider.state('app.home', {
    url: "/",
    views: {
      "main@": {
        templateUrl: "templates/home.html",
        controller: "home-Ctrl"
      }
    }
  });
}]);

ptcApp.controller('app-Ctrl', ["$scope", "$firebaseAuth", "LxDialogService", function($scope, $firebaseAuth, LxDialogService) {
  var auth;
  auth = $firebaseAuth();
  $scope.login = {};
  $scope.signin = {};
  $scope.LxDialog = LxDialogService;
  $scope.logIn = function() {
    return auth.$createUserWithEmailAndPassword($scope.login.email, $scope.login.password).then(function(res) {
      return res.updateProfile({
        displayName: $scope.login.name
      })["catch"](function(error) {
        return console.error('logIn failed:', error);
      });
    })["catch"](function(error) {
      return console.error('logIn failed:', error);
    });
  };
  $scope.signIn = function(provider) {
    if (provider === 'email') {
      return auth.$signInWithEmailAndPassword($scope.signin.email, $scope.signin.password)["catch"](function(error) {
        return console.error('signIn failed:', error);
      });
    } else {
      return auth.$signInWithPopup(provider)["catch"](function(error) {
        return console.error('signIn failed:', error);
      });
    }
  };
  return $scope.signOut = function() {
    return auth.$signOut()["catch"](function(error) {
      return console.error('signOut failed:', error);
    });
  };
}]);

ptcApp.controller('main-Ctrl', ["$scope", "config", "$firebaseAuth", "LxNotificationService", function($scope, config, $firebaseAuth, LxNotificationService) {
  $scope.config = config;
  $scope.$on('alert', function($event, options) {
    return LxNotificationService.success(options.text, true);
  });
  return $firebaseAuth().$onAuthStateChanged(function(user) {
    if (user) {
      $scope.$emit('alert', {
        type: 'success',
        text: 'signIn'
      });
      return $scope.user = user;
    } else {
      return $scope.user = false;
    }
  }, function(error) {
    return console.log(error);
  }, function(completed) {
    return console.log(completed);
  });
}]);

ptcApp.controller('auth-Ctrl', [
  '$scope', '$firebaseAuth', function($scope, $firebaseAuth) {
    var auth;
    auth = $firebaseAuth();
    auth.$onAuthStateChanged((function(user) {
      console.log(user);
      if (user) {
        $scope.$emit('alert', {
          type: 'success',
          text: 'signIn'
        });
        $scope.user = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photo: user.photoURL
        };
      } else {
        $scope.user = false;
      }
    }), (function(error) {
      console.log(error);
    }), function(completed) {
      console.log(completed);
    });
    $scope.signIn = function(provider) {
      auth.$signInWithPopup(provider).then(function(firebaseUser) {
        console.log('Signed in as:', firebaseUser);
      })["catch"](function(error) {
        console.log('Authentication failed:', error);
      });
    };
    $scope.signOut = function(provider) {
      auth.$signOut().then(function(resp) {
        console.log('signOut success:', resp);
        $scope.user = false;
      })["catch"](function(error) {
        console.log('signOut failed:', error);
      });
    };
  }
]);

ptcApp.controller('msg-Ctrl', [
  '$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var ref;
    ref = firebase.database().ref().child('messages');
    $scope.messages = $firebaseArray(ref);
    $scope.addMessage = function() {
      $scope.messages.$add({
        text: $scope.newMessageText
      }).then(function() {
        $scope.newMessageText = null;
      });
    };
  }
]);

ptcApp.controller('home-Ctrl', ["$scope", "$timeout", "LxDatePickerService", function($scope, $timeout, LxDatePickerService) {
  $scope.LxDatePicker = LxDatePickerService;
  console.log($scope);
  return $timeout(function() {
    var map;
    return map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 40.416775,
        lng: -3.703790
      },
      zoom: 6
    });
  }, 1);
}]);

ptcApp.factory('$User', function() {
  var user;
  user = {};
  this.setData = function(data) {
    return user = data;
  };
  return this.getData = function(item) {
    if (!item) {
      return user;
    }
    return user[item];
  };
});
