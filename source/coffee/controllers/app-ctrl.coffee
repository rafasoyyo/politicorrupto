ptcApp.controller('app-Ctrl', ($scope, $firebaseAuth, LxDialogService)->

    auth = $firebaseAuth()

    $scope.access = {}

    $scope.LxDialog = LxDialogService

    auth.$onAuthStateChanged(
        (user) ->
            # console.log user
            if user
                $scope.$emit 'alert', { type: 'success', text: 'signIn' }
                $scope.user =
                    name: user.displayName
                    email: user.email
                    uid: user.uid
                    photo: user.photoURL
            else
                $scope.user = false
        ,
        (error) -> console.log error
        ,
        (completed) -> console.log completed
    )


    $scope.logIn = ->
        auth.$createUserWithEmailAndPassword($scope.login.email, $scope.login.email)
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