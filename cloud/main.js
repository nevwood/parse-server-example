
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("arrival", function(request, response) {
  var query = new Parse.Query("checkin");
  query.equalTo("phase", request.params.movie);
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum ++;
      }
      response.success(results.length);
    },
    error: function() {
      response.error("failed");
    }
  });
});
