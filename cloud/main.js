
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("departure", function(request, response) {
  Parse.Cloud.useMasterKey();
  var record = Parse.Object.extend("checkin");
  var query = new Parse.Query(record);
  // run query to find specific record
  query.equalTo("phase", request.params.phase);
  query.equalTo("username", request.params.user);
  query.equalTo("in", request.params.in);
  query.each(function (object) {
        object.set("phase", "COMPLETE");
        object.set("status", "DEP-STANDARD");
        object.set("out", request.params.out);
        object.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(99);
    }, function(err) {
        response.error(err);
    });
});

Parse.Cloud.define("arrival", function(request, response) {
  Parse.Cloud.useMasterKey();
  // var record = Parse.Object.extend("checkin");
  var record = new Parse.Object("checkin");
        record.set("username", request.params.username);
        record.set("checkin", request.params.checkin);
        record.set("in", request.params.in);
        record.set("out", request.params.out);
        record.set("phase", "INSITU");
        record.set("status", "ARRIVAL-STANDARD");
        record.set("usersagepref", request.params.usersagepref);
        record.set("ageprefs", request.params.ageprefs);
        record.set("gendercode", request.params.gendercode);
        record.save({ useMasterKey: true });
});

  Parse.Cloud.define("firstrun", function(request, response) {
  Parse.Cloud.useMasterKey();
  var record2 = Parse.Object.extend("checkin");
  var query2 = new Parse.Query(record2);   
  // run query to find all other records
  query2.equalTo("phase", request.params.phase);
  query2.equalTo("username", request.params.user);
  query2.each(function (object2) {
        object2.set("phase", "COMPLETE");
        object2.set("status", "FIRST-RUN");
        object2.set("out", request.params.out);
        object2.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(99);
    }, function(err) {
        response.error(err);
    });
});
 
Parse.Cloud.define("cleanup", function(request, response) {
  Parse.Cloud.useMasterKey();
  var record3 = Parse.Object.extend("checkin");
  var query3 = new Parse.Query(record3);    
  // run query to find all other records
  query3.equalTo("phase", "INSITU");
  query3.equalTo("username", request.params.user);
  query3.lessThan("in", request.params.in);
//  query3.greaterThan("in", request.params.in);
  query3.each(function (object3) {
        object3.set("phase", "COMPLETE");
        object3.set("status", "ARRIVAL-CLEAN");
        object3.set("out", request.params.in);
        object3.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(99);
    }, function(err) {
        response.error(err);
    });
 
  
  Parse.Cloud.define("userArrive", function(request, response) {
  Parse.Cloud.useMasterKey();
  // var userRecord = Parse.Object.extend("user");
  // var userQuery = new Parse.Query(userRecord)   
    var userQuery = new Parse.Query(Parse.User)  
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
  
  
  
  
  
  
