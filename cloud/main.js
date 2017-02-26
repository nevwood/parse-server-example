
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("arrival", function(request, response) {
  var record = Parse.Object.extend("checkin");
  var query = new Parse.Query(record);
  query.equalTo("phase", request.params.movie);
  query.equalTo("username", request.params.user);
  query.first({
    useMasterKey: true, 
    success: function(object) {
//      var sum = 0;
//      for (var i = 0; i < results.length; ++i) {
        // for each object we find
        object.set("phase", "WRITTEN");
        object.save({ useMasterKey: true });
//      }
      response.success(object.length);
    },
    error: function() {
      response.error("failed");
    }
  });
});
