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
    if(parts.file){
      var fileName = archive.paths['archivedSites'] + '/' + parts.file;
      var stats = fs.statSync(fileName);
      if(stats.isFile()){
        // console.log("it is a file");
        responseData = fs.readFileSync(archive.paths['archivedSites'] + '/' + parts.file, 'utf8');
      } else {
        statusCode = 404;
      }
    } else {
      // console.log('index.html');
      responseData = fs.readFileSync(archive.paths['siteAssets'] + '/index.html', 'utf8');
    }
    res.writeHead(statusCode);
    res.end(responseData || "file not found");
  },

  "POST": function(req, res){
    collectData(req, function(data){
      //pick up! expects to write data to site.txt. do this when we get bavck from dinner.
      console.log('collected Data', data);
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
