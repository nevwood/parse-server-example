
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define("arrival", function(request, response) {
 //  console.log('start of code');
  var record = Parse.Object.extend("checkin");
  var query = new Parse.Query(record);
  query.equalTo("phase", request.params.status);
  query.equalTo("username", request.params.user);
  query.each(function (object) {
//    useMasterKey: true, 
//    success: function(object) {
//      var sum = 0;
//      for (var i = 0; i < results.length; ++i) {
        // for each object we find
        object.set("phase", "WRITTEN");
        object.save({ useMasterKey: true });
    }).then(function (success) {
        response.success(22);
    }, function(err) {
        response.error(err);
    });
});
