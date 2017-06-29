
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
  var query = new Parse.Query("_User");
  query.get(request.params.userId, { useMasterKey: true }).then((user) {
    user.setPassword(request.params.newPassword);
    return user.save(null, { useMasterKey: true });
  }).then((user) => {
    response.success(JSON.stringify(user));
  }, (obj, error) => { 
    response.error(error.message);
  });
});

  
  
  
