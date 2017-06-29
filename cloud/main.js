
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
// var userId = request.params.Id; --> I guess he was the main culprit,  the params and the actual column value should match. Instead of passing Id from my client code(see below) I just passed objectId and it worked.
var userId = request.params.userId;
// var userName = request.params.username;  
var newPassword = request.params.newPassword;
// var User = Parse.Object.extend("User");
var updateQuery =  new Parse.Query(Parse.User); 
console.log("id from params: "+userId);
updateQuery.equalTo("objectId", userId);
updateQuery.first({
    success: function(userRecord){          
        // userRecord.set("username", userName);
        userRecord.set("password", newPassword);          
        userRecord.save(null,{
            success: function(successData){                 
                response.success("password updated successfully.");
                userRecord.fetch();                 
            },
            error: function(errorData){
                console.log("Error while updating the username: ",errorData);

            }
        });         

    },
    error: function(errorData){
        console.log("Error: ",errorData);
        response.error(errorData);
    }
});
});

  
  
  
