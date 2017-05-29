var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var parseServerConfig = require('parse-server-azure-config');
var url = require('url');

var parse_api = new ParseServer({
  databaseURI: process.env.MONGOLAB_URI || 'mongodb://nuurdleclonedb-parse:eHwb9tDVUUk3tDCT9QVIDSXAzvW3oH3MmdnufxU18X9Y2F5blWtzQE3x50L7f8IWd9Uprhg99PxDuyZ0eeSqrA==@nuurdleclonedb-parse.documents.azure.com:10250/parse?ssl=true',
    cloud: './cloud/main.js',
    appId: '614922c7-3ff4-4401-bb21-e4ac67fdd2cd',
  // fileKey: 'xxxxxxx',
    masterKey: '6b68e534-bb1f-4785-972a-7682dc2f7016',
    serverURL: process.env.PARSE_SERVER_URL || 'https://nuurdleprod.azurewebsites.net/parse'
});

var config = parseServerConfig(__dirname);

// Modify config as necessary before initializing parse server & dashboard

var app = express();
app.use('/public', express.static(__dirname + '/public'));
// app.use('/parse', new ParseServer(config.server));
app.use('/parse', parse_api);
app.use('/parse-dashboard', ParseDashboard(config.dashboard, true));


app.listen(process.env.PORT || url.parse(config.server.serverURL).port, function () {
  console.log(`Parse Server running at ${config.server.serverURL}`);
});
