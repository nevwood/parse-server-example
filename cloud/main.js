
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

  Parse.Cloud.define("userArrive", function(request, response) {
  Parse.Cloud.useMasterKey();
  // var userRecord = Parse.Object.extend("user");
  // var userQuery = new Parse.Query(userRecord);   
    var userQuery = new Parse.Query(Parse.User);  
  // run query to find current user record
  userQuery.equalTo("username", request.params.user);
  userQuery.each(function (userObject) {
        userObject.set("nrdleMe", "INSITU99");
        userObject.set("curloc", request.params.checkin);
        userObject.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(99);
    }, function(err) {
        response.error(err);
    });

  
  
  
  
  
  
