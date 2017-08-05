// server.js
var express = require('express');
var useragent = require('express-useragent');
var app = express();
app.use(useragent.express());
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var api = '/api/whoami';
app.get(api, function(req, res){
  //var ipad = req.ip;
  //var ipad = req.connection.remoteAddress  
var ipad = req.headers["x-forwarded-for"];
  if (ipad){
    var list = ipad.split(",");
    ipad = list[0];
  } else {
    ipad = req.connection.remoteAddress;
  }
  var os = req.useragent.os;
  var browser = req.useragent.browser;
  var lang = req.acceptsLanguages();
  res.json({'ipaddress': ipad, 'language': lang[0], 'OS': os, 'Browser': browser});
})

// listen for requests :)
var listener = app.listen(process.env.PORT);

