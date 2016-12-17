ptcApp.controller('app-Ctrl', ($scope, $firebaseAuth, LxDialogService)->

    auth = $firebaseAuth()

    $scope.login = {}
    
    $scope.signin = {}

    $scope.LxDialog = LxDialogService

    $scope.logIn = ->
        auth.$createUserWithEmailAndPassword($scope.login.email, $scope.login.password)
            .then (res)->
                res.updateProfile({ displayName: $scope.login.name })
                    .catch (error)->
                        console.error 'logIn failed:', error
            .catch (error)->
                console.error 'logIn failed:', error

    $scope.signIn = (provider) ->
        if provider is 'email'
            auth.$signInWithEmailAndPassword($scope.signin.email, $scope.signin.password)
                .catch (error) ->
                    console.error 'signIn failed:', error
        else
            auth.$signInWithPopup(provider)
                .catch (error) ->
                    console.error 'signIn failed:', error


    $scope.signOut = ->
        auth.$signOut()
            .catch (error)->
                console.error 'signOut failed:', error

)