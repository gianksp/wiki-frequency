# (Wikipedia Word Counter) Workday Sample Excercise

[![Alt text for your video](https://i.ytimg.com/vi/jaFFzFgULo0/hqdefault.jpg)](https://www.youtube.com/watch?v=jaFFzFgULo0)

###Word Frequency

Program to fetch a Wikipedia page and report the top n words on that page. Includes both a visual Interface and a simple API

###Considerations

 * The parameters to the program API are 'page_id' and 'n'.
 * This returns a JSON object containing word ocurrences and text data analysis.
 * When two or more words have the same frequency include them all on the same search.
 * A word is defined as a sequence of at least four alphabetic characters.
 * Included unit tests and a README describing how to compile and run.

###Omisions

 * The excercise required to list all same frequency words on the same line separated by comma, however, since we are implementing a UI, for better displaying of the information I decided to display it as a vertical list instead. The main purpose of grouping them by number of ocurrences is kept in both the API call and the UI design. (Hopefully this won't be a problem, if it is, please let me know)
 
###Prerrequisites and Installation:

 * You must have Node.js installed
 * Download or clone this source
 * In the root folder run npm install for dependencies
 * Install mocha for testing npm install -g mocha
 * Run the project with node server/server.js
 * visit http://localhost:8080

###There is also a [cloud version](http://wiki-freq.rhcloud.com)

## Text analysis highlight

Words are grouped by ocurrence, analysed in a case insensitive way and highlighted using colors that match specific words.

![Highlight](http://s33.postimg.org/gfm45aejz/highlight.png)

## API Reference

This project provides a rather simple API, the endpoint which would be localhost or [cloud version](http://wiki-freq.rhcloud.com). 
- Service name : analyse
- Input params : page_id (Wikipedia Page ID), n (Number of top finds, optional defaulted to 5)
- output : a json containing the word ocurrence analysis and the original text analysed.

![API](http://s33.postimg.org/4nikw87jj/ap2.png)

## Tests

 * Tests are run with Mocha.js
 * mocha server/tests/server.js

## Note

 * In the excercise example for page id 21721040 it says that the word stack appears 21 times when we can visually appreciate using the UI of this tool that in reality it appears 22. The same for other words that appear in the output of the example, don't match this tool's output. Since I can visually identify the matches using the UI tool I don't have an alternative but to believe the is another condition I'm not taking into consideration when doing regex eval or, the example output is wrong. In any case I can't speculate due the fact that the excercise definition is way too short to know. Feedback would be appreciated in this case and I'll gladly modify it in case it is a bug on my side.
 
## Technologies Used:

 * [Node.js](https://nodejs.org/en) for server side
 * [Angular.js](https://angularjs.org/) for client side
 * [Mocha.js](https://mochajs.org/) for testing in Node.js
 * [Material](https://material.angularjs.org/latest/) for UI materialized
