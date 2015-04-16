var path = require('path');
var archive = require('../helpers/archive-helpers');
var parser = require('./parseUtil');
var fs = require('fs');
// require more modules/folders here!


var actions = {

  "GET": function(req, res){
    var parts = parser(req.url);
    var responseData;
    var statusCode = 200;
    var siteName;
    if (parts.path[0] === '/') {
      siteName = parts.path.slice(1);
    }
    console.log(parts, req.url);
    if(siteName){
      var fileName = archive.paths['archivedSites'] + '/' + siteName;
      if(fs.existsSync(fileName)){
        console.log("it is a file");
        responseData = fs.readFileSync(archive.paths['archivedSites'] + '/' + siteName, 'utf8');
      } else  {
        console.log("We entered the 404 code")
        statusCode = 404;
      }
    } else if (parts.path === '/') {
      console.log('index.html');
      responseData = fs.readFileSync(archive.paths['siteAssets'] + '/index.html', 'utf8');
    } else {
      console.log("Illegal path");
      statusCode = 404;
    }
    res.writeHead(statusCode);
    res.end(responseData || "file not found");
  },

  "POST": function(req, res){
    collectData(req, function(data){
      var dataParts = data.split('=');
      var sitesString = fs.readFileSync(archive.paths.list, 'utf8');
      fs.writeFileSync(archive.paths.list, sitesString + dataParts[1] + '\n');
      res.writeHead(302);
      res.end();
    });

    // console.log("post", req.url);
    // var parts = parser(req.url);
  }

};



var collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};


exports.handleRequest = function (req, res) {
    var action = actions[req.method];
  if( action ){
    action(req, res);
  } else {
    // sendResponse(response, "Not Found", 404);
  }

};
