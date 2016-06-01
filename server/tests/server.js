var should    = require("should");  
var supertest = require("supertest");
analyser      = require("./../analyser");
config        = require("./../config/app.js");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://"+config.app.ip+":"+config.app.port);

// UNIT test begin
describe("Analyser tests",function(){

  //Check params
  it("Check parameters validation",function(done){  
    //calling ADD api
    server
    .get('/analyse')
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.success.should.equal(false);
      done();
    });
  });

  //Check params
  it("Check optional parameters",function(done){  
    //calling ADD api
    server
    .get('/analyse?page_id=21721040')
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

  //Check params
  it("Check mandatory parameters",function(done){  
    //calling ADD api
    server
    .get('/analyse?n=10')
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.success.should.equal(false);
      done();
    });
  });

  //#1 Validate endpoint 
  it("Validate endpoint",function(done){  
    //calling api
    server
    .get('/analyse?page_id=21721040&n=5')
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

  //#1 Validate data
  it("Validate data parsing",function(done){  
    //calling api
    server
    .get('/analyse?page_id=21721040&n=1')
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      res.body.ocurrences.length.should.equal(1);
      res.body.ocurrences[0].total.should.equal(22);
      done();
    });
  });

});