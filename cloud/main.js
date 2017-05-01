
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
    var userId = request.params.userId;
    var uniqueNuurdleId = request.params.uniqueNuurdleId;

    var query = new Parse.Query(Parse.User);
    query.get(userId).then(function(user) {
        user.addUnique("nearbyNuurdles", uniqueNuurdleId);
        return user.save(null, {useMasterKey:true});
    }).then(function(user) {
        response.success(user);
    }, function(error) {
        response.error(error);
    });
});
  
  
  
  
