// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
//
//
var archive = require('../helpers/archive-helpers');
archive.downloadUrls();

// cron tab entry:
// */1 * * * * node /Users/HR10/desktop/2015-03-web-historian/workers/htmlfetcher.js
