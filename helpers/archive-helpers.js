var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var parser =  require('../web/parseUtil');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var sitesString = fs.readFileSync(exports.paths.list, 'utf8');
  callback(sitesString.split('\n'));
};

exports.isUrlInList = function(){
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(url){
  // var listOfUrls;
  // exports.readListOfUrls(function(list) {
  //   listOfUrls = list;
  // });
  // return (listOfUrls.indexOf(url) !== -1);
  //
  var fileName = getFileNameForURL(url);
  return (fs.existsSync(fileName));
};

exports.downloadUrls = function() {
  var listOfUrls;
  exports.readListOfUrls(function(list) {
    listOfUrls = list;
  });
  for(var i = 0; i < listOfUrls.length; i++){

    if(!exports.isURLArchived(listOfUrls[i])){
      // console.log('***** downloadUrls: ', i);
      if(listOfUrls[i]){
        downloadURL(listOfUrls[i]);
      }
    }
  }
};

var downloadURL = function(url){
  console.log('url to download: ', url);
  var fileName = getFileNameForURL(url);
  console.log('file to download: ', fileName);
  httpRequest.get({url: url}, fileName, function(err, res){
    if(err){
      console.log("There was an Error!", err);
    }
    console.log(res.code, res.headers,
      res.buffer ? res.buffer.toString() : "no buffer");
  });
}

var getFileNameForURL = function(url){
  // console.log('getFileNameForURL: ', url);
  var parts = parser(url);
  // console.log('url parts: ', parts);
  var fileName = exports.paths['archivedSites'] + '/' + parts.host;
  return fileName;
}









