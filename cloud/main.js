
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("arrival", function(request, response) {
  var query = new Parse.Query("checkin");
  Parse.Cloud.useMasterKey();
  query.equalTo("phase", request.params.movie);
  query.equalTo("username", request.params.user);
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        // for each object we find
        results.set("phase", "WRITTEN");
        results.save();
      }
      response.success(results.length);
    },
    error: function() {
      response.error("failed");
    }
  });
});
