var http       = require('http');
var express    = require('express');
var path       = require('path');

//Configurable properties
config         = require("./config/app");
analyser       = require("./analyser");

//HTTP SERV
var app    = express(); 
var router = express.Router();

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
router.get('/analyse', function(req, res) { 

  var page_id = req.query.page_id;                        //Wikipedia page id
  var n       = req.query.n ? parseInt(req.query.n) : 5;  //Top n most common words (+4 alphabetic), defaults 5

  //Validate input, page_id is mandatory, for total we can use default
  if (!page_id)       return res.status(400).json({success:false, response:"Invalid Wikipedia page_id" });
  if (!n || isNaN(n)) return res.status(400).json({success:false, response:"The parameter 'n' must be a valid number, or don't use it and it will default to 5" });

  //Get data and analyse, we will be building a response object that includes the wikipedia data plus the desired analysis
  analyser.getWikipediaPage(page_id,function(response) {
    var ocurrences = analyser.analyseOcurrences(response.query.pages[page_id],n);
    res.json({success:true, id:page_id, url:response.url, title:response.query.pages[page_id].title, extract:response.query.pages[page_id].extract, ocurrences:ocurrences });
  });

});

/*********************************************** INIT ***********************************************/

app.use(express.static(path.join(__dirname, '../client')));
app.use('/',router);
var server = http.createServer(app);
server.listen( config.app.port, config.app.ip, function() { console.log((new Date()) + ' Server is listening on port '+config.app.port); });

