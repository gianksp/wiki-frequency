var http       = require('http');
var requestify = require('requestify'); 
var express    = require('express');
var __         = require('underscore');
var path       = require('path');

//Configurable properties
config         = require("./config/app");

//HTTP SERV
var app    = express(); 
app.use(express.static(path.join(__dirname, '../client')));
var server = http.createServer(app);
server.listen( config.app.port, config.app.ip, function() { console.log((new Date()) + ' Server is listening on port '+config.app.port); });

/********************************************* API *****************************************************/

/**
 * Retrieve from wikipedia given a page id and a total elements to analyze, the word ocurrence analysis
 * GET Method call receives 2 params:
 * page_id  -> mandatory  -> Wikipedia valid page_id
 * n        -> optional   -> limit of word ocurrences list 
 * @param      {[type]}                 req  [description]
 * @param      {[type]}                 res) {              var page_id [description]
 * @return     {[type]}                      [description]
 */
app.get('/analyse', function(req, res) { 

  var page_id = req.query.page_id;                        //Wikipedia page id
  var n       = req.query.n ? parseInt(req.query.n) : 5;  //Top n most common words (+4 alphabetic), defaults 5

  //Validate input, page_id is mandatory, for total we can use default
  if (!page_id)       return res.status(400).json({success:false, response:"Invalid Wikipedia page_id" });
  if (!n || isNaN(n)) return res.status(400).json({success:false, response:"The parameter 'n' must be a valid number, or don't use it and it will default to 5" });

  //Get data and analyse, we will be building a response object that includes the wikipedia data plus the desired analysis
  getWikipediaPage(page_id,function(response) {
    var ocurrences = analyseOcurrences(response.query.pages[page_id],n);
    res.json({success:true, id:page_id, title:response.query.pages[page_id].title, extract:response.query.pages[page_id].extract, ocurrences:ocurrences });
  });

});

/********************************************** UTILS ************************************************/

/**
 * Execute the remote call to Wikipedia API for the specific page to obtain the data, pass it as part of the callback response for
 * further processing
 * @param      {[type]}                 page_id  Wikipedia page id
 * @param      {Function}               callback Mandatory callback, return the complete response from wikipedia (bridging)
 * @return     {[type]}                 promise
 */
function getWikipediaPage(page_id,callback) {
    return requestify.get("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&pageids="+page_id+"&explaintext&format=json").then(function(response) {
        callback(response.getBody());
    });
}

/**
 * Given a Wikipedia page, analyse title and content in search for words, process counts and return a summary
 * Lets remove special characters and split into a listed string we can analyse, later on map reduce the count 
 * @param      {[type]}                 page     [description]
 * @param      {Function}               callback [description]
 * @return     {[type]}                          [description]
 */
function analyseOcurrences(page,n) {
    var map       = {};
    var content   = page.extract.toLowerCase().replace(/[^\w\s]/ig, "").replace(/\n/g," ").split(" ");
    //Create a map of "total":"word", count unmappable elements as '_' for deletion
    var countMap  = __.countBy(content, function(item) {  if (item != undefined && item.length >= 4 && isNaN(item)) return item; else return '_'; });
    delete countMap['_'];
    //Group the equal total words from the summary count map
    __.each(Object.keys(countMap),function(item) { if (!map[countMap[item]]) { map[countMap[item]] = [item] } else { map[countMap[item]].push(item); } });
    //Sort and filter
    var arrayMap  = __.map(Object.keys(map), function(key) {  return { total:parseInt(key), words:map[key] } }); 
    var sortedMap = __.sortBy(arrayMap,'total').reverse().slice(0,n);
    return sortedMap;
}