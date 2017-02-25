
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!');
});

Parse.Cloud.define('arrival', function(req, res) {
  res.success('arrival code');
});
