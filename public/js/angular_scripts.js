var ptcApp;

firebase.initializeApp({
  apiKey: "AIzaSyACFYYD9sdGg5Va_pmPi8MAPRSTMsPX1bM",
  authDomain: "politicorrupto-f320f.firebaseapp.com",
  databaseURL: "https://politicorrupto-f320f.firebaseio.com",
  storageBucket: "politicorrupto-f320f.appspot.com",
  messagingSenderId: "105923145713"
});

ptcApp = angular.module('politicorrupto', ['lumx', 'firebase']);

ptcApp.controller('main-Ctrl', [
  '$scope', '$firebaseAuth', 'LxNotificationService', function($scope, $firebaseAuth, LxNotificationService) {
    var auth;
    $scope.$on('alert', function($event, options) {
      console.log(options);
      console.log(LxNotificationService);
      LxNotificationService.success(options.text, true);
    });
    auth = $firebaseAuth();
    auth.$onAuthStateChanged((function(user) {
      console.log('main-Ctrl', user);
    }), (function(error) {
      console.log('main-Ctrl', error);
    }), function(completed) {
      console.log('main-Ctrl', completed);
    });
  }
]);

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
