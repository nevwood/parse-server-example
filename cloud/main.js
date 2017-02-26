
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("departure", function(request, response) {
 //  console.log('start of code');
  var record = Parse.Object.extend("checkin");
  var query = new Parse.Query(record);
  query.equalTo("phase", request.params.phase);
  query.equalTo("username", request.params.user);
  query.each(function (object) {
//    useMasterKey: true, 
//    success: function(object) {
//      var sum = 0;
//      for (var i = 0; i < results.length; ++i) {
        // for each object we find
        object.set("phase", "COMPLETE");
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
    response.success(100);
    response.error(01);
});
