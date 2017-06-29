
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("userArrive", function(request, response) {
  Parse.Cloud.useMasterKey();
  // var record = Parse.Object.extend("checkin");
  var userQuery = new Parse.Query(Parse.User); 
  // run query to find specific record
  userQuery.equalTo("username", request.params.user);
  userQuery.each(function (object) {
        object.set("nrdleMe", "INSITU99");
        object.set("curloc", request.params.checkin);
        object.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(99);
    }, function(err) {
        response.error(err);
    });
});

Parse.Cloud.define("userLeave", function(request, response) {
  Parse.Cloud.useMasterKey();
  // var record = Parse.Object.extend("checkin");
  var userQuery = new Parse.Query(Parse.User); 
  // run query to find specific record
  userQuery.equalTo("username", request.params.user);
  userQuery.each(function (object) {
        object.set("nrdleMe", "MOVE");
        object.set("curloc", request.params.checkin);
        object.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(99);
    }, function(err) {
        response.error(err);
    });
});


Parse.Cloud.define('updateNearbyUser', function(request, response) {
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", request.params.userId);
    query.each(function (object) {
      object.addUnique("nearbyNuurdles", request.params.uniqueNuurdleId);
      object.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(99);
    }, function(err) {
        response.error(err);
    });
});


Parse.Cloud.define('resetPassword', function(request, response) {
    Parse.Cloud.useMasterKey();
    query.equalTo("username", request.params.userId);
    query.first({
      success: function(theUser){
          var newPassword = request.params.newPassword;
          console.log("New Password: " + newPassword);
          console.log("set: " + theUser.set("password", newPassword));
          console.log("setPassword: " + theUser.setPassword(newPassword));

       theUser.save(null,{
            success: function(theUser){
                // The user was saved correctly
                res.success(1);

            },
            error: function(SMLogin, error){
                res.error("error message");
            }
        });
    },
    error: function(error){
        res.error("error and stuff" + error);
    }
});

  
  
  
