
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


  
  
  
  
  
  
