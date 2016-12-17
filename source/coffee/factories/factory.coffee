
ptcApp.factory('$User', ()->

    user = {}

    this.setData = (data)->
        user = data

    this.getData = (item)->
        if !item then return user
        return user[item]

)