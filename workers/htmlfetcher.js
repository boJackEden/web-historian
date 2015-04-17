// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
//
//
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
//archive.downloadUrls();
//
var log = function(str) {
  fs.appendFileSync('/Users/HR10/Desktop/2015-03-web-historian/historian.log', str +  '\n');
}

// cron tab entry:
// */1 * * * * node /Users/HR10/desktop/2015-03-web-historian/workers/htmlfetcher.js
var CronJob = require('cron').CronJob;
log("before calling cron..." + new Date());
new CronJob('01 * * * * *', function(){
    log('running cron job...' + new Date());
    archive.downloadUrls();
}, null, true, "America/Los_Angeles");
