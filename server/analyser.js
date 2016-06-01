var __         = require('underscore');
var requestify = require('requestify'); 

/** analyser.js **/
var analyser = {

      /**
       * Execute the remote call to Wikipedia API for the specific page to obtain the data, pass it as part of the callback response for
       * further processing
       * @param      {[type]}                 page_id  Wikipedia page id
       * @param      {Function}               callback Mandatory callback, return the complete response from wikipedia (bridging)
       * @return     {[type]}                 promise
       */
      getWikipediaPage: function(page_id,callback) {
          var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&pageids="+page_id+"&explaintext&format=json";
          return requestify.get(url).then(function(response) {
              var res = response.getBody();
              res.url = url;
              callback(res);
          });
      },

      /**
       * Given a Wikipedia page, analyse title and content in search for words, process counts and return a summary
       * Lets remove special characters and split into a listed string we can analyse, later on map reduce the count 
       * @param      {[type]}                 page     [description]
       * @param      {Function}               callback [description]
       * @return     {[type]}                          [description]
       */
      analyseOcurrences: function(page,n) {
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

};

module.exports = analyser;