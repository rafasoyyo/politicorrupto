# Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyACFYYD9sdGg5Va_pmPi8MAPRSTMsPX1bM",
    authDomain: "politicorrupto-f320f.firebaseapp.com",
    databaseURL: "https://politicorrupto-f320f.firebaseio.com",
    storageBucket: "politicorrupto-f320f.appspot.com",
    messagingSenderId: "105923145713"
})

# Initialize Angular
ptcApp = angular.module('politicorrupto', ['lumx', 'firebase'])