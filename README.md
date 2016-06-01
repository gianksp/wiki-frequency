# (Wikipedia Word Counter) Workday Sample Excercise

[![Word analyser](https://youtu.be/jaFFzFgULo0/0.jpg)](https://youtu.be/jaFFzFgULo0)

Prerrequisites and Installation:

 * You must have Node.js installed
 * Download or clone this source
 * In the root folder run npm install for dependencies
 * Run the project with node server/server.js
 * visit http://localhost:8080

There is also a [cloud version](http://wiki-freq.rhcloud.com)

## API Reference

This project provides a rather simple API, the endpoint which would be localhost or [cloud version](http://wiki-freq.rhcloud.com). 
- Service name : analyse
- Input params : page_id (Wikipedia Page ID), n (Number of top finds, optional defaulted to 5)
- output : a json containing the word ocurrence analysis and the original text analysed.

## Tests

Tests are run with Mocha.js

## Technologies Used:

 * [Node.js](https://nodejs.org/en) for server side
 * [Angular.js](https://angularjs.org/) for client side
 * [Mocha.js](https://mochajs.org/) for testing in Node.js
 * [Material](https://material.angularjs.org/latest/) for UI materialized
