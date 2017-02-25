
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define('arrival', function(request, response){
    Parse.Cloud.useMasterKey();
    var user = new Parse.User();
    var query = new Parse.Query("checkin");
    var phase = "INSITU" 
    var count;
    query.include('phase');
    query.include('username');
    query.equalTo("phase", phase)
    query.equalTo("username", request.params.input)
    query.find().then(function(results) {
      count = results.length;
        return Parse.Object.saveAll(results);
    }).then(function(result) {
        response.success("success");
    }, function(error) {
        response.error(error);
    });
});
