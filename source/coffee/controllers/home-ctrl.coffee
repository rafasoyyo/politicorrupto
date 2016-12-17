ptcApp.controller('home-Ctrl', ($scope, $timeout, LxDatePickerService)->
    $scope.LxDatePicker = LxDatePickerService
    console.log $scope

    $timeout(->
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.416775, lng: -3.703790},
            zoom: 6
        })
    ,1)
)
