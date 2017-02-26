
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("departure", function(request, response) {
  Parse.Cloud.useMasterKey();
  var record = Parse.Object.extend("checkin");
  var query = new Parse.Query(record);
//  var query2 = new Parse.Query(record);
  
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
        record.set("status", request.params.status);
        record.set("usersagepref", request.params.usersagepref);
        record.set("ageprefs", request.params.ageprefs);
        record.set("gendercode", request.params.gendercode);
        record.save({ useMasterKey: true });
  
  var query = new Parse.Query(record);
  // run query to find any INSITU for the user that was created before the above
  query.equalTo("phase", request.params.phase);
  query.equalTo("username", request.params.user);
  query.lessThan("in", request.params.in);
  query.greaterThan("out", request.params.out);
  
  query.each(function (object) {
        object.set("phase", "COMPLETE");
        object.set("status", "ARR-NON-STANDARD");
        object.set("out", request.params.in);        
        object.save({ useMasterKey: true });  
    response.success(100);
    response.error(01);
});
  
  
  Parse.Cloud.define("firstrun", function(request, response) {
  Parse.Cloud.useMasterKey();
  var record = Parse.Object.extend("checkin");
  var query2 = new Parse.Query(record);
    
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

  
  
  
  
  
  
  
  
